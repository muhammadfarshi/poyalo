import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb, 
  Share2, 
  Search, 
  RotateCcw, 
  Flame, 
  MapPin, 
  Compass,
  Check
} from 'lucide-react';
import { CURATED_MYTHS, POPULAR_DESTINATIONS, TravelMyth } from '../../data/mythData';
import { generateAIMyths } from '../../services/aiService';

interface MythPointerViewProps {
  initialCity?: string;
  onSelectCity?: (city: string) => void;
}

export const MythPointerView: React.FC<MythPointerViewProps> = ({
  initialCity = 'Tokyo',
  onSelectCity
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [customInput, setCustomInput] = useState<string>('');
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [customMyths, setCustomMyths] = useState<Record<string, TravelMyth[]>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync state whenever initialCity changes from parent (e.g. planner or route selection)
  useEffect(() => {
    if (initialCity && initialCity.trim()) {
      const trimmed = initialCity.trim();
      setSelectedCity(trimmed);
      setActiveCategory('all');
    }
  }, [initialCity]);

  // Match against curated keys case-insensitively
  const resolvedCuratedKey = useMemo(() => {
    const target = selectedCity.trim().toLowerCase();
    return Object.keys(CURATED_MYTHS).find(k => 
      k.toLowerCase() === target || 
      target.includes(k.toLowerCase()) || 
      k.toLowerCase().includes(target)
    ) || null;
  }, [selectedCity]);

  // Auto-fetch with Gemini AI if a non-curated city is selected and not in custom cache
  useEffect(() => {
    if (!resolvedCuratedKey && !customMyths[selectedCity] && selectedCity && selectedCity !== 'Worldwide') {
      let isMounted = true;
      setIsGeneratingAI(true);
      generateAIMyths(selectedCity)
        .then((generated) => {
          if (isMounted && generated && generated.length > 0) {
            setCustomMyths(prev => ({ ...prev, [selectedCity]: generated }));
          }
        })
        .catch(err => {
          console.warn('Auto AI myth generation error:', err);
        })
        .finally(() => {
          if (isMounted) setIsGeneratingAI(false);
        });

      return () => { isMounted = false; };
    }
  }, [selectedCity, resolvedCuratedKey, customMyths]);

  // Active myths list
  const activeMyths: TravelMyth[] = useMemo(() => {
    if (customMyths[selectedCity]) {
      return customMyths[selectedCity];
    }
    if (resolvedCuratedKey && CURATED_MYTHS[resolvedCuratedKey]) {
      return CURATED_MYTHS[resolvedCuratedKey];
    }
    // Default to Tokyo if none selected
    return CURATED_MYTHS['Tokyo'] || [];
  }, [selectedCity, resolvedCuratedKey, customMyths]);

  const filteredMyths = useMemo(() => {
    if (activeCategory === 'all') return activeMyths;
    return activeMyths.filter(m => m.category === activeCategory);
  }, [activeMyths, activeCategory]);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setActiveCategory('all');
    if (onSelectCity) onSelectCity(cityName);
  };

  const handleGenerateCustomCity = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = customInput.trim();
    if (!target) return;

    // Check if matching curated destination
    const match = POPULAR_DESTINATIONS.find(d => 
      d.name.toLowerCase() === target.toLowerCase() || target.toLowerCase().includes(d.name.toLowerCase())
    );
    if (match) {
      handleCityChange(match.name);
      setCustomInput('');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const generated = await generateAIMyths(target);
      if (generated && generated.length > 0) {
        setCustomMyths(prev => ({
          ...prev,
          [target]: generated
        }));
        setSelectedCity(target);
        setActiveCategory('all');
        setCustomInput('');
        if (onSelectCity) onSelectCity(target);
      }
    } catch (err) {
      console.error('Failed to generate myths:', err);
      alert(`Could not fetch myths for "${target}". Please check connection or try again.`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleShareMyth = (myth: TravelMyth) => {
    const text = `❌ MYTH: ${myth.myth}\n✅ REALITY: ${myth.reality}\n💡 INSIDER TIP: ${myth.insiderTip}\n\nVia POYALO Myth Pointer for ${myth.city}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(myth.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111827] relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#FF5722] text-white px-2.5 py-0.5 rounded font-mono font-black text-xs uppercase border border-[#111827]">
            POYALO • MYTH POINTER
          </span>
          <span className="bg-[#FBBF24] text-[#111827] px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-[#111827]">
            CULTURE & REALITY AUDIT
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827] mt-2 tracking-tight">
          Destination Myth Buster & Local Lore
        </h1>
        <p className="text-xs sm:text-sm font-mono text-gray-700 mt-1 max-w-2xl">
          Don’t fall for outdated stereotypes or embarrassing tourist traps. Based on your booked destination, 
          we point out cultural truths, etiquette customs, monument realities, and food etiquette before you land.
        </p>

        {/* Destination Quick Selector Pills */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <label className="block text-[11px] font-mono font-black text-gray-500 uppercase mb-2">
            SELECT OR SWITCH DESTINATION:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {POPULAR_DESTINATIONS.map((dest) => {
              const isSelected = selectedCity.toLowerCase().includes(dest.name.toLowerCase());
              return (
                <button
                  key={dest.name}
                  onClick={() => handleCityChange(dest.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black flex items-center space-x-1.5 transition-all border-2 border-[#111827] min-h-[38px] ${
                    isSelected
                      ? 'bg-[#1B3FFF] text-white shadow-[3px_3px_0px_#111827] -translate-y-0.5'
                      : 'bg-[#FDFBF7] text-[#111827] hover:bg-gray-100'
                  }`}
                >
                  <span>{dest.flag}</span>
                  <span>{dest.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Worldwide AI Search Input */}
        <form onSubmit={handleGenerateCustomCity} className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Or enter any city in the world (e.g. Kyoto, Reykjavik, Marrakech)..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
            />
          </div>
          <button
            type="submit"
            disabled={isGeneratingAI || !customInput.trim()}
            className="px-4 py-2.5 bg-[#111827] text-white border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#FF5722] hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-h-[44px]"
          >
            {isGeneratingAI ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>AI DEBUNKING...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>DEBUNK WITH GEMINI AI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Active City & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border-2 border-[#111827] rounded-xl p-3 shadow-[3px_3px_0px_#111827]">
        <div className="flex items-center space-x-2">
          <span className="text-xl">📍</span>
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block leading-none">
              CURRENTLY VIEWING MYTHS FOR
            </span>
            <span className="text-lg font-display font-black text-[#111827] leading-tight">
              {resolvedCuratedKey || selectedCity}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'ALL MYTHS' },
            { id: 'humans', label: '👥 HUMANS & SOCIETY' },
            { id: 'monuments', label: '🏛️ MONUMENTS' },
            { id: 'food', label: '🍜 FOOD & DRINK' },
            { id: 'traditional', label: '📜 TRADITIONS' },
            { id: 'safety', label: '⚠️ TRAPS & SAFETY' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-black border border-[#111827] transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#111827] text-white shadow-[2px_2px_0px_#FBBF24]'
                  : 'bg-[#FDFBF7] text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading AI State */}
      {isGeneratingAI && (
        <div className="bg-[#FEF3C7] border-[2.5px] border-[#111827] rounded-2xl p-6 text-center space-y-3 shadow-[4px_4px_0px_#111827] animate-pulse">
          <Sparkles className="w-8 h-8 mx-auto text-[#FF5722] animate-spin" />
          <h3 className="text-lg font-display font-black text-[#111827]">
            Consulting Cultural Historians & Gemini 3.1 Flash Lite...
          </h3>
          <p className="text-xs font-mono text-gray-700">
            Debunking common tourist myths, dining misconceptions, and local etiquette realities for {customInput || selectedCity}.
          </p>
        </div>
      )}

      {/* Myths Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMyths.map((myth) => {
          const isCopied = copiedId === myth.id;

          return (
            <div
              key={myth.id}
              className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111827] flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="space-y-3">
                
                {/* Card Top: Category & Emoji */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl p-1 bg-[#FDFBF7] border border-[#111827] rounded-lg">
                      {myth.emoji}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-gray-500 block leading-none">
                        {myth.categoryLabel}
                      </span>
                      <span className="text-xs font-display font-black text-[#111827]">
                        {myth.city}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#111827] ${
                    myth.severity === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : myth.severity === 'medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {myth.severity === 'high' ? '⚠️ CRITICAL ETIQUETTE' : myth.severity === 'medium' ? '⚡ TOURIST TRAP' : '✨ FUN FACT'}
                  </span>
                </div>

                {/* The Myth (Red Box) */}
                <div className="p-3 bg-red-50 border-2 border-red-900/40 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="bg-red-600 text-white font-mono font-black text-[9px] uppercase px-1.5 py-0.2 rounded">
                      ❌ THE BUSTED MYTH
                    </span>
                  </div>
                  <p className="text-xs font-display font-bold text-red-950 italic">
                    "{myth.myth}"
                  </p>
                </div>

                {/* The Reality (Emerald Box) */}
                <div className="p-3 bg-emerald-50 border-2 border-emerald-900/40 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="bg-emerald-600 text-white font-mono font-black text-[9px] uppercase px-1.5 py-0.2 rounded">
                      ✅ THE AUTHENTIC REALITY
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-emerald-950">
                    {myth.reality}
                  </p>
                </div>

                {/* Insider Tip (Yellow Box) */}
                <div className="p-3 bg-amber-50 border-2 border-amber-900/40 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-900 font-mono font-black text-[9px] uppercase">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>LOCAL INSIDER ADVICE:</span>
                  </div>
                  <p className="text-[11px] font-mono text-amber-950">
                    {myth.insiderTip}
                  </p>
                </div>

              </div>

              {/* Share / Copy Action */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400">
                  POYALO Cultural Intelligence
                </span>
                <button
                  onClick={() => handleShareMyth(myth)}
                  className="px-3 py-1.5 bg-[#FDFBF7] hover:bg-[#111827] hover:text-white text-[#111827] border-2 border-[#111827] rounded-lg text-[10px] font-mono font-black transition-colors flex items-center space-x-1 active:scale-95"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>SHARE THIS MYTH</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredMyths.length === 0 && !isGeneratingAI && (
        <div className="text-center py-12 bg-white border-2 border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] p-6">
          <p className="text-sm font-mono font-bold text-gray-500">
            No myths found for this filter. Try selecting "ALL MYTHS" or enter another city above!
          </p>
        </div>
      )}

    </div>
  );
};
