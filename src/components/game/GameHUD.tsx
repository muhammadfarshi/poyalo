import React, { useState } from 'react';
import { Sparkles, Trophy, Users, X, Check, BookOpen, Sun, Sunset, Moon, Zap, ArrowUp } from 'lucide-react';
import { CollectibleItem, TravelEmote } from '../../types/game';

interface GameHUDProps {
  score: number;
  pearlsCollected: number;
  totalPearls: number;
  playersOnline: number;
  nearbyPlayerName?: string;
  onSendEmote: (emote: TravelEmote) => void;
  unlockedItem: CollectibleItem | null;
  onDismissUnlock: () => void;
  timeOfDay?: 'day' | 'sunset' | 'night';
  onToggleTimeOfDay?: () => void;
  speedBoostActive?: boolean;
  onJump?: () => void;
  activeBadge?: { text: string; icon: string } | null;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  pearlsCollected,
  totalPearls,
  playersOnline,
  nearbyPlayerName,
  onSendEmote,
  unlockedItem,
  onDismissUnlock,
  timeOfDay = 'day',
  onToggleTimeOfDay,
  speedBoostActive = false,
  onJump,
  activeBadge
}) => {
  const [showEmotePicker, setShowEmotePicker] = useState(false);

  const emotes: TravelEmote[] = [
    'Marhaba! 👋',
    'Yalla! 🚀',
    'Karak Tea? ☕',
    'Photo Spot! 📸'
  ];

  return (
    <>
      {/* Top Left: Score & Collectible Badges */}
      <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* District & Game Title */}
        <div className="bg-[#111827] text-white px-2.5 py-1 rounded-xl border border-white/20 shadow-[2px_2px_0px_#111827] flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-display font-black text-xs tracking-wide">VG WORLD</span>
          <span className="text-[10px] font-mono text-amber-300">EXPLORE & EXPANDED</span>
        </div>

        {/* Score Pill */}
        <div className="bg-white border-2 border-[#111827] px-3 py-1 rounded-full shadow-[2px_2px_0px_#111827] flex items-center space-x-1.5">
          <span className="text-sm">🪙</span>
          <span className="font-mono font-black text-xs text-[#111827]">{score} PTS</span>
        </div>

        {/* Pearls Pill */}
        <div className="bg-[#EBF2FF] border-2 border-[#111827] px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#111827] flex items-center space-x-1">
          <span className="text-sm">🦪</span>
          <span className="font-mono font-black text-xs text-[#1B3FFF]">
            {pearlsCollected}/{totalPearls}
          </span>
        </div>

        {/* Real-time Players Badge */}
        <div className="bg-white border-2 border-[#111827] px-2.5 py-1 rounded-full shadow-[2px_2px_0px_#111827] hidden sm:flex items-center space-x-1">
          <Users className="w-3 h-3 text-[#1B3FFF]" />
          <span className="font-mono font-bold text-[10px] text-gray-800">
            {playersOnline} ONLINE
          </span>
        </div>
      </div>

      {/* Top Right: Time of Day Atmosphere Switcher & Controls */}
      <div className="absolute top-3 right-3 z-30 flex items-center space-x-2 pointer-events-auto">
        
        {/* Time of Day Toggle Button */}
        {onToggleTimeOfDay && (
          <button
            onClick={onToggleTimeOfDay}
            title="Toggle Day / Sunset / Neon Night Atmosphere"
            className="px-2.5 py-1.5 bg-white hover:bg-amber-50 border-2 border-[#111827] rounded-xl font-mono font-black text-[10px] shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1 transition-all"
          >
            {timeOfDay === 'day' && (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span className="text-gray-900">DAY</span>
              </>
            )}
            {timeOfDay === 'sunset' && (
              <>
                <Sunset className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
                <span className="text-orange-950">SUNSET</span>
              </>
            )}
            {timeOfDay === 'night' && (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500 fill-indigo-400" />
                <span className="text-indigo-950">NIGHT</span>
              </>
            )}
          </button>
        )}

        {/* Desktop Controls Hint */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm border-2 border-[#111827] px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_#111827] text-[10px] font-mono font-bold text-gray-700 pointer-events-none">
          <span>WASD: MOVE</span>
          <span>•</span>
          <span>SPACE: JUMP</span>
        </div>
      </div>

      {/* Active Boost / Event Alert Banner */}
      {speedBoostActive && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 bg-[#FBBF24] text-[#111827] border-2 border-[#111827] rounded-full shadow-[3px_3px_0px_#111827] font-mono font-black text-xs flex items-center space-x-1.5 animate-pulse pointer-events-none">
          <Zap className="w-4 h-4 text-[#1B3FFF] fill-[#1B3FFF]" />
          <span>⚡ 1.8X SPEED BOOST ACTIVATED!</span>
        </div>
      )}

      {/* Comic Badge Popups (e.g. "SUPER BOUNCE!" or "SECRET CHEST!") */}
      {activeBadge && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 bg-[#FF5722] text-white border-2 border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] font-comic text-lg flex items-center space-x-2 animate-bounce pointer-events-none">
          <span>{activeBadge.icon}</span>
          <span className="tracking-wide">{activeBadge.text}</span>
        </div>
      )}

      {/* Mobile Jump Button (Bottom Right) */}
      {onJump && (
        <button
          type="button"
          onClick={onJump}
          title="Jump / Leap (Spacebar)"
          className="absolute bottom-6 right-5 z-30 w-16 h-16 bg-[#FBBF24] hover:bg-amber-300 active:bg-amber-400 text-[#111827] rounded-full border-[2.5px] border-[#111827] shadow-[4px_4px_0px_#111827] flex flex-col items-center justify-center font-display font-black text-xs uppercase active:translate-x-1 active:translate-y-1 transition-transform pointer-events-auto select-none touch-none"
        >
          <ArrowUp className="w-6 h-6 stroke-[3]" />
          <span className="text-[9px] -mt-0.5 tracking-tight font-black">JUMP</span>
        </button>
      )}

      {/* Proximity Action Pill (Appears when within 3.5m of remote player) */}
      {nearbyPlayerName && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-auto">
          {!showEmotePicker ? (
            <button
              onClick={() => setShowEmotePicker(true)}
              className="px-5 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white border-2 border-[#111827] rounded-full shadow-[4px_4px_0px_#111827] font-display font-black text-xs uppercase tracking-wider flex items-center space-x-2 active:translate-x-0.5 active:translate-y-0.5 animate-bounce"
            >
              <span>👋</span>
              <span>SAY MARHABA TO {nearbyPlayerName.toUpperCase()}!</span>
            </button>
          ) : (
            <div className="bg-white border-[2.5px] border-[#111827] p-2 rounded-2xl shadow-[4px_4px_0px_#111827] flex items-center gap-1.5 animate-fadeIn">
              {emotes.map((em) => (
                <button
                  key={em}
                  onClick={() => {
                    onSendEmote(em);
                    setShowEmotePicker(false);
                  }}
                  className="px-3 py-1.5 bg-[#FDFBF7] hover:bg-[#FBBF24] border-2 border-[#111827] rounded-xl text-xs font-mono font-black text-[#111827] shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5"
                >
                  {em}
                </button>
              ))}
              <button
                onClick={() => setShowEmotePicker(false)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Cultural Fact Unlock Modal (Triggered on Collectible Hit) */}
      {unlockedItem && (
        <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 pointer-events-auto">
          <div className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-5 max-w-sm w-full shadow-[6px_6px_0px_#111827] space-y-3 animate-scaleUp">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="bg-[#10B981] text-white text-[10px] font-mono font-black px-2 py-0.5 rounded border border-[#111827]">
                +{unlockedItem.points} POINTS UNLOCKED!
              </span>
              <button 
                onClick={onDismissUnlock}
                className="text-gray-500 hover:text-black font-bold p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Glyph & Item Name */}
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center text-3xl">
                {unlockedItem.emoji}
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-[#111827]">
                  {unlockedItem.name}
                </h3>
                <span className="text-xs font-mono text-gray-500 font-bold">
                  Heritage Cultural Lore Card
                </span>
              </div>
            </div>

            {/* Cultural Fact Card */}
            <div className="p-3 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl text-xs font-mono text-[#111827] leading-relaxed shadow-inner">
              <p className="font-bold text-[#FF5722] mb-1 flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                <span>CULTURAL TRIVIA:</span>
              </p>
              <p>{unlockedItem.culturalFact}</p>
            </div>

            {/* Stamp into Passport CTA */}
            <button
              onClick={onDismissUnlock}
              className="w-full py-2.5 bg-[#1B3FFF] hover:bg-[#1532CC] text-white border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#111827] flex items-center justify-center space-x-1.5 active:translate-x-0.5 active:translate-y-0.5"
            >
              <Check className="w-4 h-4" />
              <span>COLLECT FACT & KEEP EXPLORING</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
};
