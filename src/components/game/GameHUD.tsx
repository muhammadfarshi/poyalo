import React, { useState } from 'react';
import { Sparkles, Trophy, Users, X, Check, BookOpen } from 'lucide-react';
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
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  pearlsCollected,
  totalPearls,
  playersOnline,
  nearbyPlayerName,
  onSendEmote,
  unlockedItem,
  onDismissUnlock
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
          <span className="text-[10px] font-mono text-amber-300">HERITAGE DISTRICT</span>
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

      {/* Top Right: Desktop Controls Pill */}
      <div className="absolute top-3 right-3 z-30 hidden md:flex items-center space-x-2 bg-white/90 backdrop-blur-sm border-2 border-[#111827] px-3 py-1 rounded-xl shadow-[2px_2px_0px_#111827] text-[10px] font-mono font-bold text-gray-700 pointer-events-none">
        <span>🎮 WASD: MOVE</span>
        <span>•</span>
        <span>DRAG MOUSE: ROTATE CAMERA</span>
      </div>

      {/* Proximity Action Pill (Appears when within 3m of another real player) */}
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
