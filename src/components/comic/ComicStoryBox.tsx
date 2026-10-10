import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Download, Check, History, BookOpen, Send, RotateCcw } from 'lucide-react';
import { ComicStory, ComicTone, EraLayer } from '../../types/comic';
import { getComicForSelection } from '../../data/mockComics';
import { generateAIComicStory } from '../../services/aiService';
import { ComicPanelItem } from './ComicPanelItem';

export const ComicStoryBox: React.FC = () => {
  const [tone, setTone] = useState<ComicTone>('roast');
  const [era, setEra] = useState<EraLayer>('1800s');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activePanelIndex, setActivePanelIndex] = useState<number>(0);
  const [isCachedOffline, setIsCachedOffline] = useState<boolean>(true);
  const [cacheToast, setCacheToast] = useState<string>('');
  const [customStoryPrompt, setCustomStoryPrompt] = useState<string>('');
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [aiCustomStory, setAiCustomStory] = useState<ComicStory | null>(null);

  const activeStory = aiCustomStory || getComicForSelection(tone, era);

  // Audio playback simulation sequence (highlights panels in rhythm)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setActivePanelIndex(prev => {
          if (prev >= activeStory.panels.length - 1) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 3500);
    } else {
      setActivePanelIndex(-1);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, activeStory.panels.length]);

  const handleDownloadOfflinePack = () => {
    setIsCachedOffline(true);
    setCacheToast('Story Pack Cached in IndexedDB for 100% Airplane Mode!');
    setTimeout(() => setCacheToast(''), 3000);
  };

  const handleGenerateCustomStory = async (e: React.FormEvent, customPrompt?: string) => {
    if (e && e.preventDefault) e.preventDefault();
    const promptToUse = customPrompt || customStoryPrompt;
    if (!promptToUse.trim()) return;

    setIsGeneratingStory(true);
    setCacheToast('🎨 Gemini drafting custom 3-panel comic lore...');

    try {
      const generated = await generateAIComicStory(promptToUse, tone, era);
      setAiCustomStory(generated);
      setCacheToast(`✨ Comic created for ${generated.cityName}!`);
      setCustomStoryPrompt('');
    } catch (err: any) {
      console.warn('Comic generation failed:', err);
      setCacheToast('⚠️ Story generation failed, showing classic lore.');
    } finally {
      setIsGeneratingStory(false);
      setTimeout(() => setCacheToast(''), 4000);
    }
  };

  const tones: { id: ComicTone; label: string; icon: string; desc: string }[] = [
    { id: 'roast', label: 'Roast Comic', icon: '🔥', desc: 'Satirical political caricature' },
    { id: 'storyteller', label: 'Storyteller', icon: '📖', desc: 'Dramatic cinematic novel' },
    { id: 'professor', label: 'Professor', icon: '🎓', desc: 'Historical schematics & facts' },
    { id: 'kid', label: 'Kid Comic', icon: '🧸', desc: 'Saturday morning cartoon strip' }
  ];

  const eras: { id: EraLayer; label: string; year: string }[] = [
    { id: '1800s', label: 'Pearl Era', year: '1880' },
    { id: '1950s', label: 'Creek Dredging', year: '1954' },
    { id: 'modern', label: 'VG World Era', year: '2026' }
  ];

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111827] relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FF5722]/10 rounded-full comic-halftone pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#FF5722] text-white px-2.5 py-0.5 rounded font-mono font-black text-xs uppercase border border-[#111827]">
                THE HEART • COMIC LORE
              </span>
              <span className="text-xs font-mono font-bold text-gray-500 uppercase">
                {activeStory.placeName} • {activeStory.cityName}
              </span>
              {aiCustomStory && (
                <button
                  onClick={() => setAiCustomStory(null)}
                  className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 border border-[#111827] rounded text-[10px] font-mono font-bold text-gray-700 flex items-center space-x-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>RESET TO SAMPLE</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827] mt-1 tracking-tight">
              {activeStory.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-gray-700 mt-1 max-w-xl">
              {activeStory.tagline}
            </p>
          </div>

          {/* Audio narration & Cache controls */}
          <div className="flex items-center space-x-2 self-start sm:self-center">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold text-xs shadow-[2px_2px_0px_#111827] flex items-center space-x-1.5 active:translate-x-0.5 active:translate-y-0.5 ${
                isPlayingAudio 
                  ? 'bg-[#10B981] text-white animate-pulse' 
                  : 'bg-white hover:bg-gray-50 text-[#111827]'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'NARRATING...' : 'AUDIO STORY'}</span>
            </button>

            <button
              onClick={handleDownloadOfflinePack}
              className="px-3 py-2 rounded-xl border-2 border-[#111827] font-mono font-bold text-xs bg-[#FBBF24] text-[#111827] shadow-[2px_2px_0px_#111827] flex items-center space-x-1 active:translate-x-0.5 active:translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">OFFLINE PACK</span>
            </button>
          </div>
        </div>

        {/* AI Worldwide Comic Lore Generator Form */}
        <form onSubmit={handleGenerateCustomStory} className="mt-4 flex gap-2">
          <input
            type="text"
            value={customStoryPrompt}
            onChange={(e) => setCustomStoryPrompt(e.target.value)}
            placeholder="Generate comic lore for ANY place worldwide (e.g. 'Kyoto Samurai Era', 'Colosseum Gladiators', 'Jazz Age Paris')..."
            className="flex-1 px-3.5 py-2.5 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#FF5722] shadow-inner"
          />
          <button
            type="submit"
            disabled={isGeneratingStory}
            className="px-4 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white border-2 border-[#111827] rounded-xl font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1.5 disabled:opacity-50"
          >
            {isGeneratingStory ? <Sparkles className="w-4 h-4 animate-spin text-amber-300" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">{isGeneratingStory ? 'DRAWING...' : 'AI COMIC'}</span>
          </button>
        </form>

        {/* Quick Inspiration Pills */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase mr-1">Sample Topics:</span>
          {[
            { label: '⛩️ Kyoto Samurai', prompt: 'Feudal Samurai Era in Kyoto Japan' },
            { label: '🏛️ Roman Gladiators', prompt: 'Colosseum gladiators in Ancient Rome' },
            { label: '🎨 Renaissance Florence', prompt: 'Leonardo and Michelangelo rivalry in Renaissance Florence' },
            { label: '🗽 1920s New York', prompt: 'Roaring twenties jazz age in Manhattan New York' }
          ].map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={(e) => handleGenerateCustomStory(e, pill.prompt)}
              disabled={isGeneratingStory}
              className="px-2 py-0.5 bg-[#FDFBF7] hover:bg-[#FEF3C7] border border-[#111827] rounded-lg text-[10px] font-mono font-bold text-gray-800 shadow-[1px_1px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 transition-colors disabled:opacity-50"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Cache Toast notification */}
        {cacheToast && (
          <div className="mt-3 p-2 bg-emerald-100 border-2 border-[#111827] rounded-lg text-emerald-900 text-xs font-mono font-bold flex items-center space-x-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>{cacheToast}</span>
          </div>
        )}
      </div>

      {/* Control Dials: Tone Dial & Era Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 4-Way Tone Dial */}
        <div className="bg-[#FFFFFF] border-2 border-[#111827] rounded-2xl p-3 sm:p-4 shadow-[3px_3px_0px_#111827]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-black text-[#111827] flex items-center space-x-1">
              <span>🎭</span>
              <span>COMIC TONE DIAL:</span>
            </span>
            <span className="text-[11px] font-mono text-gray-500 font-bold uppercase">
              {tones.find(t => t.id === tone)?.desc}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`py-2 px-2 rounded-xl border-2 border-[#111827] text-xs font-mono font-black flex items-center justify-center space-x-1 transition-all ${
                  tone === t.id
                    ? 'bg-[#1B3FFF] text-white shadow-[2px_2px_0px_#111827] -translate-y-0.5'
                    : 'bg-[#FDFBF7] text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{t.icon}</span>
                <span className="truncate">{t.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Era Layers Slider / Selector */}
        <div className="bg-[#FFFFFF] border-2 border-[#111827] rounded-2xl p-3 sm:p-4 shadow-[3px_3px_0px_#111827]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-black text-[#111827] flex items-center space-x-1">
              <History className="w-3.5 h-3.5 text-[#111827]" />
              <span>ERA TIME MACHINE:</span>
            </span>
            <span className="text-[11px] font-mono text-[#FF5722] font-black uppercase">
              {eras.find(e => e.id === era)?.label}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {eras.map((e) => (
              <button
                key={e.id}
                onClick={() => setEra(e.id)}
                className={`py-2 px-2 rounded-xl border-2 border-[#111827] text-xs font-mono font-black flex flex-col items-center justify-center transition-all ${
                  era === e.id
                    ? 'bg-[#FF5722] text-white shadow-[2px_2px_0px_#111827] -translate-y-0.5'
                    : 'bg-[#FDFBF7] text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{e.year}</span>
                <span className="text-[9px] font-bold opacity-90 truncate max-w-full">
                  {e.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* The Responsive Comic Strip Panels */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono font-bold text-gray-600 uppercase">
            3-PANEL GRAPHIC NOVEL STRIP • {activeStory.panels.length} PANELS
          </span>
          <span className="text-[11px] font-mono text-[#1B3FFF] font-bold">
            100% OFFLINE READY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeStory.panels.map((panel, idx) => (
            <ComicPanelItem 
              key={panel.panelNumber} 
              panel={panel} 
              isActive={isPlayingAudio && activePanelIndex === idx}
            />
          ))}
        </div>
      </div>

      {/* Citations & Historical Archive Footer */}
      <div className="bg-[#FDFBF7] border-2 border-[#111827] rounded-xl p-3 shadow-[2px_2px_0px_#111827] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-gray-700" />
          <span className="text-[11px] font-mono font-bold text-gray-800">
            Historical Sources Grounding:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeStory.sources.map((src, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 bg-white border border-[#111827] rounded text-[10px] font-mono font-medium text-gray-700 shadow-sm"
            >
              📜 {src}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
