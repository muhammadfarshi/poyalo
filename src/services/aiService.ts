import { ItineraryStop } from '../types/itinerary';
import { ComicStory, ComicTone, EraLayer } from '../types/comic';

const GEMINI_API_KEY: string = 
  (import.meta as any).env?.VITE_GEMINI_API_KEY ||
  'AQ.Ab8RN6Iyt_JMmvMg-e0q1KRlB_Vv3eASwDgXn2t1SIYhe_HWbA';

export interface GeneratedPlanResponse {
  city: string;
  country: string;
  theme: string;
  stops: ItineraryStop[];
}

export async function generateAIPlan(userPrompt: string): Promise<GeneratedPlanResponse> {
  // 1. Try Vercel / serverless endpoint first
  try {
    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt })
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.stops?.length > 0) return data;
    }
  } catch {
    // Fall back to direct Gemini call
  }

  // 2. Direct Gemini 3.1 Flash Lite API Call
  const systemPrompt = `You are a world-class travel planner for the POYALO app.
The user wants an itinerary for: "${userPrompt}".
Extract or determine the destination city and country, then generate a realistic 1-day itinerary with 3 to 5 distinct stops.

Return ONLY a valid JSON object matching this exact schema:
{
  "city": "Name of City",
  "country": "Name of Country",
  "theme": "Catchy route title (e.g. Historic Kyoto Temple Walk)",
  "stops": [
    {
      "name": "Attraction Name",
      "category": "heritage" | "souk" | "museum" | "food" | "viewpoint",
      "startTime": "HH:MM (24h format)",
      "endTime": "HH:MM (24h format)",
      "durationMinutes": 60,
      "lat": 35.6895,
      "lng": 139.6917,
      "isOutdoor": true,
      "idealForSunset": false,
      "notes": "Short highlight or insider tip"
    }
  ]
}

Ensure:
- Real geographic coordinates (lat, lng) for each stop so the travel physics engine works accurately.
- Logically sequenced times throughout the day (e.g. 09:30 to 18:30).
- If one stop is a scenic sunset or lookout point, set "idealForSunset": true and schedule it in the late afternoon.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API returned ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) {
    throw new Error('No content returned from AI');
  }

  const parsed = JSON.parse(textContent);

  // Normalize stops to conform with ItineraryStop interface
  const formattedStops: ItineraryStop[] = (parsed.stops || []).map((s: any, idx: number) => ({
    id: `ai-stop-${Date.now()}-${idx}`,
    poiId: `poi-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: s.name,
    category: s.category || 'heritage',
    startTime: s.startTime || '10:00',
    endTime: s.endTime || '11:30',
    durationMinutes: Number(s.durationMinutes) || 75,
    lat: Number(s.lat) || 0,
    lng: Number(s.lng) || 0,
    isOutdoor: Boolean(s.isOutdoor),
    idealForSunset: Boolean(s.idealForSunset),
    notes: s.notes || undefined
  }));

  return {
    city: parsed.city || 'Custom Destination',
    country: parsed.country || 'Worldwide',
    theme: parsed.theme || 'Curated Exploration Trail',
    stops: formattedStops
  };
}

export async function generateAIComicStory(
  placeOrCity: string,
  tone: ComicTone,
  era: EraLayer
): Promise<ComicStory> {
  const prompt = `Create a 3-panel comic story for "${placeOrCity}" in tone "${tone}" and era layer "${era}".
Follow the POYALO comic style with narrative caption, scenes, speech bubbles, sound effects, and sources.

Return a valid JSON object matching this schema:
{
  "title": "Comic Episode Title",
  "tagline": "Witty 1-sentence subtitle",
  "cityName": "${placeOrCity}",
  "panels": [
    {
      "panelNumber": 1,
      "narrativeCaption": "CAPTION IN CAPS",
      "panelScene": "Scene description",
      "illustrationEmoji": "🏛️",
      "illustrationBgColor": "#FEF3C7",
      "speechBubbles": [
        {
          "speaker": "Character Name",
          "avatarEmoji": "🤠",
          "text": "Dialogue line",
          "type": "speech" | "thought" | "shout",
          "pointerDirection": "bottom-left" | "bottom-right"
        }
      ],
      "soundEffect": {
        "text": "BOOM!",
        "color": "#FF5722",
        "rotationDeg": -6
      }
    }
  ],
  "sources": ["Source 1", "Source 2"]
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.8
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate comic story');
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = JSON.parse(textContent);

  return {
    id: `ai-comic-${Date.now()}`,
    placeId: `poi-${placeOrCity.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    placeName: placeOrCity,
    cityName: parsed.cityName || placeOrCity,
    eraLayer: era,
    tone: tone,
    title: parsed.title,
    tagline: parsed.tagline,
    panels: parsed.panels || [],
    sources: parsed.sources || ['Local Historical Archives']
  };
}

export interface GeneratedMythItem {
  id: string;
  city: string;
  country: string;
  category: 'humans' | 'monuments' | 'food' | 'traditional' | 'safety';
  categoryLabel: string;
  emoji: string;
  myth: string;
  reality: string;
  insiderTip: string;
  severity: 'high' | 'medium' | 'fun';
}

export async function generateAIMyths(destinationName: string): Promise<GeneratedMythItem[]> {
  const prompt = `You are a cultural myth-buster and local etiquette expert for POYALO travel app.
The traveler has booked or is planning a trip to: "${destinationName}".
Identify the most prevalent myths, misconceptions, tourist stereotypes, and cultural traps related to:
1. The local humans / people & their social etiquette
2. Famous monuments & attractions
3. Food, dining, and drinking traditions
4. Real tourist traps or safety realities

Return ONLY a valid JSON array of 4 distinct myth objects matching this schema:
[
  {
    "category": "humans" | "monuments" | "food" | "traditional" | "safety",
    "categoryLabel": "Short category title (e.g. People & Customs)",
    "emoji": "Single relevant emoji decal",
    "myth": "The common false belief or tourist misconception (1-2 sentences)",
    "reality": "The authentic local reality, historical fact, or cultural truth (2 sentences)",
    "insiderTip": "Actionable local etiquette advice or insider hack for visitors (1-2 sentences)",
    "severity": "high" | "medium" | "fun"
  }
]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to generate myths for ${destinationName}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) throw new Error('No myth data received from AI');

  const parsed = JSON.parse(textContent);
  const items = Array.isArray(parsed) ? parsed : parsed.myths || [];

  return items.map((m: any, idx: number) => ({
    id: `ai-myth-${Date.now()}-${idx}`,
    city: destinationName,
    country: m.country || 'Destination',
    category: m.category || 'traditional',
    categoryLabel: m.categoryLabel || 'Local Lore',
    emoji: m.emoji || '💡',
    myth: m.myth || 'Common tourist misconception.',
    reality: m.reality || 'The local authentic reality.',
    insiderTip: m.insiderTip || 'Be respectful and ask locals politely.',
    severity: m.severity || 'fun'
  }));
}
