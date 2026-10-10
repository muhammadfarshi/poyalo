import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Wand2, 
  Flame, 
  GraduationCap, 
  AlertOctagon, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  Send
} from 'lucide-react';
import { ItineraryStop } from '../../types/itinerary';
import { auditItinerary } from '../../engines/realityCheckEngine';
import { autoRepairItinerary } from '../../engines/autoRepairEngine';
import { getRandomMurphyScenario } from '../../engines/murphyEngine';
import { StopCard } from './StopCard';

// 1. Chaotic Demo Itinerary (triggers missed hours, Friday closure, impossible transit, missed golden hour)
export const CHAOTIC_PRESET_STOPS: ItineraryStop[] = [
  {
    id: 'c-stop-1',
    poiId: 'poi-spice-souk',
    name: 'Deira Grand Spice Souk',
    category: 'souk',
    startTime: '10:00',
    endTime: '11:15',
    durationMinutes: 75,
    lat: 25.2692,
    lng: 55.2981,
    isOutdoor: false
  },
  {
    id: 'c-stop-2',
    poiId: 'poi-jumeirah-mosque',
    name: 'Jumeirah Grand Mosque',
    category: 'heritage',
    startTime: '11:15', // ZERO buffer, 12 km across city!
    endTime: '12:30',
    durationMinutes: 75,
    lat: 25.2338,
    lng: 55.2655,
    isOutdoor: false
  },
  {
    id: 'c-stop-3',
    poiId: 'poi-seef-sunset',
    name: 'Al Seef Promenade Sunset Point',
    category: 'viewpoint',
    startTime: '13:00', // Midday sun! Missed sunset!
    endTime: '14:30',
    durationMinutes: 90,
    lat: 25.2605,
    lng: 55.3055,
    isOutdoor: true,
    idealForSunset: true
  },
  {
    id: 'c-stop-4',
    poiId: 'poi-burj-promenade',
    name: 'Burj Khalifa Lake & Fountain Plaza',
    category: 'viewpoint',
    startTime: '14:30', // ZERO buffer for 10km!
    endTime: '16:00',
    durationMinutes: 90,
    lat: 25.1972,
    lng: 55.2744,
    isOutdoor: true
  }
];

export const OPTIMAL_PRESET_STOPS: ItineraryStop[] = [
  {
    id: 'opt-stop-1',
    poiId: 'poi-tea-house',
    name: 'Arabian Tea House Cafe',
    category: 'food',
    startTime: '09:00',
    endTime: '10:15',
    durationMinutes: 75,
    lat: 25.2629,
    lng: 55.2965,
    isOutdoor: false
  },
  {
    id: 'opt-stop-2',
    poiId: 'poi-fahidi',
    name: 'Al Fahidi Historical Neighbourhood',
    category: 'heritage',
    startTime: '10:35',
    endTime: '12:00',
    durationMinutes: 85,
    lat: 25.2635,
    lng: 55.2972,
    isOutdoor: true
  },
  {
    id: 'opt-stop-3',
    poiId: 'poi-creek-abra',
    name: 'Dubai Creek Traditional Abra Crossing',
    category: 'heritage',
    startTime: '12:20',
    endTime: '13:10',
    durationMinutes: 50,
    lat: 25.2678,
    lng: 55.2995,
    isOutdoor: true
  },
  {
    id: 'opt-stop-4',
    poiId: 'poi-seef-sunset',
    name: 'Al Seef Promenade Sunset Point',
    category: 'viewpoint',
    startTime: '17:45',
    endTime: '19:00',
    durationMinutes: 75,
    lat: 25.2605,
    lng: 55.3055,
    isOutdoor: true,
    idealForSunset: true,
    notes: '✨ Snapped to Dubai Golden Hour (18:15)'
  }
];

export const ItineraryPlanner: React.FC = () => {
  const [stops, setStops] = useState<ItineraryStop[]>(CHAOTIC_PRESET_STOPS);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [planToast, setPlanToast] = useState<string | null>(null);
  const [isMurphyActive, setIsMurphyActive] = useState<boolean>(false);
  const [commentaryMode, setCommentaryMode] = useState<'roast' | 'professor'>('roast');

  const murphyScenario = useMemo(() => getRandomMurphyScenario(), []);

  // Run deterministic audit
  const auditResult = useMemo(() => {
    return auditItinerary(
      stops, 
      '2026-10-16', // Friday
      isMurphyActive, 
      isMurphyActive ? murphyScenario.title : undefined
    );
  }, [stops, isMurphyActive, murphyScenario.title]);

  const handleAutoRepair = () => {
    const repaired = autoRepairItinerary(stops, auditResult.goldenHourTime, isMurphyActive);
    setStops(repaired);

    // Fire celebratory confetti for the score jump
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored
    }
  };

  const handleMurphyToggle = () => {
    setIsMurphyActive(!isMurphyActive);
  };

  const handleGenerateFromPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    setIsGenerating(true);

    const lower = userPrompt.toLowerCase();
    const heritageKeywords = ['heritage', 'culture', 'history', 'old', 'traditional', 'souk', 'creek', 'abra'];
    const chaoticKeywords = ['adventure', 'chaos', 'random', 'wild', 'fast', 'rush'];

    const hasChaotic = chaoticKeywords.some((keyword) => lower.includes(keyword));
    const hasHeritage = heritageKeywords.some((keyword) => lower.includes(keyword));

    setTimeout(() => {
      setIsGenerating(false);
      if (hasChaotic && !hasHeritage) {
        setStops(CHAOTIC_PRESET_STOPS);
        setPlanToast('🚨 Matched: Chaotic Speed Run');
      } else {
        setStops(OPTIMAL_PRESET_STOPS);
        setPlanToast('✨ Matched: Heritage Cultural Tour');
      }
      setIsMurphyActive(false);
      setUserPrompt('');

      setTimeout(() => {
        setPlanToast(null);
      }, 3000);
    }, 400);
  };

  const scoreBadgeBg = 
    auditResult.score >= 80 
      ? 'bg-emerald-500 text-white' 
      : auditResult.score >= 55 
      ? 'bg-amber-500 text-white' 
      : 'bg-red-500 text-white';

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      
      {/* Hero Header Banner */}
      <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111827] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#1B3FFF] text-white px-2.5 py-0.5 rounded font-mono font-black text-xs uppercase border border-[#111827]">
                THE BRAIN • REALITY CHECK ENGINE
              </span>
              <span className="text-xs font-mono font-bold text-gray-500">
                100% Client TypeScript
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827] mt-1 tracking-tight">
              AI Travel Plan Reality Check
            </h1>
            <p className="text-xs sm:text-sm font-mono text-gray-700 mt-1">
              Deterministic validation of venue opening hours, transit physics, and SunCalc Golden Hour.
            </p>
          </div>

          {/* Quick Presets for Demo Pitch */}
          <div className="flex flex-wrap gap-2 self-start sm:self-center">
            <button
              onClick={() => { setStops(CHAOTIC_PRESET_STOPS); setIsMurphyActive(false); }}
              className="px-3 py-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-red-900 border-2 border-[#111827] rounded-xl text-xs font-mono font-black shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1"
            >
              <span>🚨</span>
              <span>PASTE CHAOTIC PLAN</span>
            </button>
            <button
              onClick={() => { setStops(OPTIMAL_PRESET_STOPS); setIsMurphyActive(false); }}
              className="px-3 py-1.5 bg-[#D1FAE5] hover:bg-[#A7F3D0] text-emerald-900 border-2 border-[#111827] rounded-xl text-xs font-mono font-black shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1"
            >
              <span>✨</span>
              <span>OPTIMAL PLAN</span>
            </button>
          </div>
        </div>

        {/* Smart Prompt Input Bar */}
        <form onSubmit={handleGenerateFromPrompt} className="mt-4 flex gap-2">
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Describe your ideal trip (e.g. 'heritage boat tour' or 'fast adventure')..."
            className="flex-1 px-3.5 py-2.5 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF] shadow-inner"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="px-4 py-2.5 bg-[#1B3FFF] text-white border-2 border-[#111827] rounded-xl font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1.5"
          >
            {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">SMART PLAN</span>
          </button>
        </form>

        {planToast && (
          <div className="mt-2 p-2 bg-emerald-100 border-2 border-[#111827] rounded-xl text-emerald-900 text-xs font-mono font-bold flex items-center space-x-2 shadow-[2px_2px_0px_#111827]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{planToast}</span>
          </div>
        )}
      </div>

      {/* Scoreboard & Reality Check Audit Panel */}
      <div className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111827] space-y-4">
        
        {/* Score & Verdict Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-100 pb-4">
          
          {/* Health Score Pill */}
          <div className="flex items-center space-x-3">
            <div className={`w-16 h-16 rounded-2xl border-[2.5px] border-[#111827] ${scoreBadgeBg} shadow-[3px_3px_0px_#111827] flex flex-col items-center justify-center font-display font-black`}>
              <span className="text-2xl leading-none">{auditResult.score}</span>
              <span className="text-[10px] font-mono tracking-wider">/ 100</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-lg text-[#111827]">
                  ITINERARY HEALTH SCORE
                </span>
                <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#111827] ${
                  auditResult.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                  auditResult.status === 'caution' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {auditResult.status}
                </span>
              </div>
              <p className="text-xs font-mono text-gray-600">
                {auditResult.flags.length} potential friction points detected by client rule engine.
              </p>
            </div>
          </div>

          {/* Action Buttons: 1-Tap Auto-Repair & Murphy Mode Chaos */}
          <div className="flex items-center space-x-2">
            {/* Auto-Repair Button */}
            <button
              onClick={handleAutoRepair}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#111827] border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center space-x-1.5"
            >
              <Wand2 className="w-4 h-4 text-[#111827]" />
              <span>ONE-TAP AUTO REPAIR</span>
            </button>

            {/* Murphy Mode Chaos Button */}
            <button
              onClick={handleMurphyToggle}
              className={`flex-1 sm:flex-none px-3.5 py-2.5 border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center space-x-1.5 ${
                isMurphyActive 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-red-100 hover:bg-red-200 text-red-900'
              }`}
            >
              <AlertOctagon className="w-4 h-4" />
              <span>{isMurphyActive ? 'MURPHY: ON 🚨' : 'MURPHY MODE'}</span>
            </button>
          </div>

        </div>

        {/* Murphy Disruption Alert Banner */}
        {isMurphyActive && (
          <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-red-950 font-mono text-xs space-y-1">
            <div className="font-black flex items-center space-x-1.5 text-red-700">
              <span className="text-base">{murphyScenario.icon}</span>
              <span>CHAOS INJECTED: {murphyScenario.title.toUpperCase()}</span>
            </div>
            <p className="text-[11px]">{murphyScenario.description}</p>
            <p className="text-[10px] font-bold text-red-800 bg-red-100/70 p-1 rounded">
              👉 {murphyScenario.impactText}
            </p>
          </div>
        )}

        {/* Roast vs Professor Commentary Box */}
        <div className="p-3.5 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl shadow-[2px_2px_0px_#111827]">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCommentaryMode('roast')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black flex items-center space-x-1 border ${
                  commentaryMode === 'roast' 
                    ? 'bg-[#FF5722] text-white border-[#111827] shadow-[1px_1px_0px_#111827]' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>SAVAGE ROAST VERDICT</span>
              </button>
              <button
                onClick={() => setCommentaryMode('professor')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black flex items-center space-x-1 border ${
                  commentaryMode === 'professor' 
                    ? 'bg-[#1B3FFF] text-white border-[#111827] shadow-[1px_1px_0px_#111827]' 
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>PROFESSOR AUDIT</span>
              </button>
            </div>
            <span className="text-[10px] font-mono text-gray-500 font-bold hidden sm:inline">
              REALITY CHECK VERDICT
            </span>
          </div>

          <p className="text-xs sm:text-sm font-mono text-[#111827] leading-relaxed pt-1">
            "{commentaryMode === 'roast' ? auditResult.roastVerdict : auditResult.professorVerdict}"
          </p>
        </div>

      </div>

      {/* Itinerary Timeline Stops */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-display font-black text-lg text-[#111827] flex items-center space-x-2">
            <span>📅</span>
            <span>DAY 1: DUBAI CULTURAL LORE ROUTE</span>
          </h2>
          <span className="text-xs font-mono font-bold text-gray-500">
            {stops.length} STOPS • DUBAI CREEK
          </span>
        </div>

        <div className="space-y-3">
          {stops.map((stop, idx) => (
            <React.Fragment key={stop.id}>
              <StopCard
                stop={stop}
                index={idx}
                flags={auditResult.flags}
                goldenHourTime={auditResult.goldenHourTime}
              />

              {/* Transit indicator between stops */}
              {idx < stops.length - 1 && (
                <div className="flex items-center justify-center my-1">
                  <div className="px-3 py-1 bg-white border border-[#111827] rounded-full text-[10px] font-mono font-bold text-gray-700 shadow-sm flex items-center space-x-1.5">
                    <span>🚗 TRANSIT</span>
                    <ArrowRight className="w-3 h-3 text-[#FF5722]" />
                    <span>~20 MINS (ACROSS DUBAI CREEK)</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};
