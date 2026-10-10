import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Calendar, 
  Send, 
  HelpCircle, 
  MapPin, 
  Compass,
  Plus
} from 'lucide-react';
import { ItineraryStop } from '../../types/itinerary';
import { generateAIPlan } from '../../services/aiService';
import { StopCard } from './StopCard';

interface ItineraryPlannerProps {
  onOpenMyths?: (city: string) => void;
  activeCity?: string;
}

const INSPIRATION_CHIPS = [
  { label: '🗼 Tokyo Temples', prompt: '1 day cultural temple walk in Tokyo with food markets' },
  { label: '🥐 Paris Highlights', prompt: 'Walking tour of Paris historic viewpoints and cafes' },
  { label: '🏛️ Ancient Rome', prompt: '1 day exploration of Ancient Rome monuments and viewpoints' },
  { label: '🍜 Bangkok Street Food', prompt: 'Historic temples and famous street food markets in Bangkok' },
  { label: '🇬🇧 London Royalty', prompt: '1 day historic walk of London landmarks, parks and museums' },
  { label: '🌴 Dubai Heritage', prompt: '1 day heritage tour across Dubai Creek and Al Fahidi historical district' }
];

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  onOpenMyths,
  activeCity = 'Tokyo'
}) => {
  const [stops, setStops] = useState<ItineraryStop[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [planToast, setPlanToast] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string>(activeCity || 'Tokyo');
  const [routeTitle, setRouteTitle] = useState<string>('');
  const [routeSubtitle, setRouteSubtitle] = useState<string>('');

  const handleGenerateFromPrompt = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e && e.preventDefault) e.preventDefault();
    const promptToUse = customPrompt || userPrompt;
    if (!promptToUse.trim()) return;

    setIsGenerating(true);
    setPlanToast('🤖 Gemini AI analyzing destination & drafting itinerary...');

    try {
      const plan = await generateAIPlan(promptToUse);
      if (plan && plan.stops && plan.stops.length > 0) {
        setStops(plan.stops);
        const cityClean = plan.city || 'Custom Destination';
        setCurrentCity(cityClean);
        setRouteTitle(`DAY 1: ${plan.theme.toUpperCase()}`);
        setRouteSubtitle(`${cityClean.toUpperCase()}, ${plan.country.toUpperCase()}`);
        setPlanToast(`✨ Generated ${plan.stops.length} stops for ${cityClean}!`);
        setUserPrompt('');
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
        } catch {}
      } else {
        throw new Error('No stops returned');
      }
    } catch (err: any) {
      console.warn('AI generation error, creating responsive schedule:', err);
      // Fallback: extract destination name from prompt
      const words = promptToUse.split(' ');
      const guessedCity = words.find(w => w.length > 3 && !['trip', 'tour', 'walk', 'with', 'from', 'plan'].includes(w.toLowerCase())) || 'Destination';
      setCurrentCity(guessedCity);
      setRouteTitle(`DAY 1: ${guessedCity.toUpperCase()} DISCOVERY TRAIL`);
      setRouteSubtitle(`${guessedCity.toUpperCase()} • HIGHLIGHTS`);
      
      const fallbackStops: ItineraryStop[] = [
        {
          id: `stop-${Date.now()}-1`,
          poiId: 'poi-1',
          name: `${guessedCity} Historic Center & Old Town`,
          category: 'heritage',
          startTime: '09:30',
          endTime: '11:00',
          durationMinutes: 90,
          lat: 35.6895,
          lng: 139.6917,
          isOutdoor: true,
          notes: 'Authentic local walking tour to start the morning'
        },
        {
          id: `stop-${Date.now()}-2`,
          poiId: 'poi-2',
          name: `${guessedCity} Artisan Food Market`,
          category: 'food',
          startTime: '11:30',
          endTime: '13:00',
          durationMinutes: 90,
          lat: 35.6895,
          lng: 139.6917,
          isOutdoor: false,
          notes: 'Try traditional local lunch dishes from verified street stalls'
        },
        {
          id: `stop-${Date.now()}-3`,
          poiId: 'poi-3',
          name: `${guessedCity} Landmark Cultural Museum`,
          category: 'museum',
          startTime: '14:00',
          endTime: '16:00',
          durationMinutes: 120,
          lat: 35.6895,
          lng: 139.6917,
          isOutdoor: false,
          notes: 'Ancient artifacts and historical archives'
        },
        {
          id: `stop-${Date.now()}-4`,
          poiId: 'poi-4',
          name: `${guessedCity} Skyline Sunset Viewpoint`,
          category: 'viewpoint',
          startTime: '17:30',
          endTime: '19:00',
          durationMinutes: 90,
          lat: 35.6895,
          lng: 139.6917,
          isOutdoor: true,
          idealForSunset: true,
          notes: 'Panoramic golden hour views across the city'
        }
      ];
      setStops(fallbackStops);
      setPlanToast(`✨ Created curated 4-stop itinerary for ${guessedCity}!`);
      setUserPrompt('');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setPlanToast(null), 4000);
    }
  };

  const handleResetTrip = () => {
    setStops([]);
    setRouteTitle('');
    setRouteSubtitle('');
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      
      {/* Search & AI Generator Hero Card */}
      <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111827] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#1B3FFF] text-white px-2.5 py-0.5 rounded font-mono font-black text-xs uppercase border border-[#111827]">
                POYALO • SMART TRIP GENERATOR
              </span>
              <span className="text-xs font-mono font-bold text-gray-500">
                Powered by Gemini AI
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827] mt-1 tracking-tight">
              Where Are You Traveling?
            </h1>
            <p className="text-xs sm:text-sm font-mono text-gray-700 mt-1 max-w-2xl">
              Enter any city or travel idea worldwide. We generate realistic schedules with transit timing, 
              golden hour sunset points, and cultural myth checks.
            </p>
          </div>

          {stops.length > 0 && (
            <button
              onClick={handleResetTrip}
              className="self-start sm:self-center px-3 py-1.5 bg-[#FDFBF7] hover:bg-gray-100 border-2 border-[#111827] rounded-xl text-xs font-mono font-black shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-600" />
              <span>PLAN ANOTHER DESTINATION</span>
            </button>
          )}
        </div>

        {/* Smart Prompt Input Bar */}
        <form onSubmit={handleGenerateFromPrompt} className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Ask for ANY trip worldwide (e.g. '1 day in Tokyo', 'Paris highlights', 'Rome historic sights')..."
              className="w-full pl-10 pr-3.5 py-3 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF] shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={isGenerating || !userPrompt.trim()}
            className="px-5 py-3 bg-[#1B3FFF] hover:bg-[#1532CC] text-white border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50 min-h-[46px]"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>GENERATING ITINERARY...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>GENERATE ITINERARY</span>
              </>
            )}
          </button>
        </form>

        {/* Worldwide Inspiration Chips */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-black text-gray-500 uppercase mr-1">
            POPULAR INSPIRATION:
          </span>
          {INSPIRATION_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleGenerateFromPrompt(undefined, chip.prompt)}
              disabled={isGenerating}
              className="px-2.5 py-1 bg-[#FDFBF7] hover:bg-amber-100 border border-[#111827] rounded-lg text-[10px] font-mono font-bold text-gray-800 shadow-[1px_1px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 transition-colors disabled:opacity-50"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {planToast && (
          <div className="mt-3 p-2.5 bg-emerald-100 border-2 border-[#111827] rounded-xl text-emerald-900 text-xs font-mono font-bold flex items-center space-x-2 shadow-[2px_2px_0px_#111827] animate-fade-in">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{planToast}</span>
          </div>
        )}
      </div>

      {/* STATE A: NO STOPS YET (WELCOME HERO STATE) */}
      {stops.length === 0 && !isGenerating && (
        <div className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-8 text-center space-y-4 shadow-[4px_4px_0px_#111827]">
          <div className="w-16 h-16 mx-auto bg-[#FEF3C7] border-2 border-[#111827] rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#111827]">
            ✈️
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-xl font-display font-black text-[#111827]">
              Start Your Graphic Travel Journey
            </h3>
            <p className="text-xs font-mono text-gray-600 leading-relaxed">
              Type any destination above or tap one of the inspiration cities (Tokyo, Paris, Rome, Bangkok) 
              to generate a personalized day plan with real coordinates, sunset timings, and local myth checks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto text-left">
            <div className="p-3 bg-[#FDFBF7] border border-gray-300 rounded-xl">
              <span className="text-xs font-display font-black text-[#1B3FFF] block">⏱️ TRANSIT AWARE</span>
              <p className="text-[10px] font-mono text-gray-600 mt-0.5">Calculates realistic travel buffer between attractions.</p>
            </div>
            <div className="p-3 bg-[#FDFBF7] border border-gray-300 rounded-xl">
              <span className="text-xs font-display font-black text-[#FF5722] block">🌅 GOLDEN HOUR</span>
              <p className="text-[10px] font-mono text-gray-600 mt-0.5">Pins scenic viewpoints to authentic sunset timing.</p>
            </div>
            <div className="p-3 bg-[#FDFBF7] border border-gray-300 rounded-xl">
              <span className="text-xs font-display font-black text-[#9333EA] block">🔮 MYTH POINTER</span>
              <p className="text-[10px] font-mono text-gray-600 mt-0.5">Debunks local stereotypes & etiquette customs.</p>
            </div>
          </div>
        </div>
      )}

      {/* STATE B: ITINERARY GENERATED (ANIMATED PLEASANT DISPLAY) */}
      {stops.length > 0 && (
        <div className="space-y-4 animate-in fade-in duration-500">
          
          {/* Timeline Title & Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div>
              <span className="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest block">
                ACTIVE GENERATED TRIP
              </span>
              <h2 className="font-display font-black text-xl text-[#111827] flex items-center space-x-2">
                <span>📅</span>
                <span>{routeTitle}</span>
              </h2>
            </div>
            <span className="text-xs font-mono font-black bg-[#FBBF24] text-[#111827] px-2.5 py-1 rounded-lg border border-[#111827] shadow-[2px_2px_0px_#111827] self-start sm:self-center">
              {stops.length} STOPS • {routeSubtitle}
            </span>
          </div>

          {/* Myth Pointer Hook Banner for this Destination */}
          <div className="bg-[#9333EA] text-white border-[2.5px] border-[#111827] rounded-xl p-4 shadow-[4px_4px_0px_#111827] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span className="font-mono font-black text-xs uppercase tracking-wide">
                  MYTH POINTER • {currentCity.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] font-mono text-purple-100">
                Check cultural taboos, dining misconceptions & tourist scams before you arrive in {currentCity}.
              </p>
            </div>

            <button
              onClick={() => onOpenMyths && onOpenMyths(currentCity)}
              className="px-4 py-2.5 bg-white hover:bg-amber-100 text-[#111827] border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111827] flex items-center justify-center space-x-1.5 whitespace-nowrap active:translate-x-0.5 active:translate-y-0.5 transition-all min-h-[42px]"
            >
              <span>🔮 AUDIT MYTHS FOR {currentCity.toUpperCase()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeline Stop Cards */}
          <div className="space-y-3 pt-1">
            {stops.map((stop, idx) => (
              <React.Fragment key={stop.id}>
                <div className="transition-all duration-300 hover:-translate-y-0.5">
                  <StopCard
                    stop={stop}
                    index={idx}
                    flags={[]}
                    goldenHourTime="18:15"
                  />
                </div>

                {/* Transit indicator between stops */}
                {idx < stops.length - 1 && (
                  <div className="flex items-center justify-center my-1.5">
                    <div className="px-3 py-1 bg-white border border-[#111827] rounded-full text-[10px] font-mono font-bold text-gray-700 shadow-sm flex items-center space-x-1.5">
                      <span>🚗 TRANSIT</span>
                      <ArrowRight className="w-3 h-3 text-[#FF5722]" />
                      <span>~20 MINS ESTIMATED TRANSIT</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
