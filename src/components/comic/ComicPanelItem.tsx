import React from 'react';
import { ComicPanel } from '../../types/comic';
import { SpeechBubble } from './SpeechBubble';

interface ComicPanelItemProps {
  panel: ComicPanel;
  isActive?: boolean;
}

export const ComicPanelItem: React.FC<ComicPanelItemProps> = ({ panel, isActive = false }) => {
  return (
    <div className={`relative flex flex-col justify-between bg-white border-[2.5px] border-[#111827] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#111827] transition-all duration-300 ${
      isActive ? 'ring-4 ring-[#FF5722] scale-[1.01]' : ''
    }`}>
      
      {/* Top Header: Panel Number & Narrative Caption ("MEANWHILE...") */}
      <div className="p-3 bg-[#FDFBF7] border-b-2 border-[#111827]">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-[#111827] text-white font-mono font-black text-[10px] px-2 py-0.5 rounded tracking-widest uppercase">
            PANEL 0{panel.panelNumber}
          </span>
          <span className="text-[10px] font-mono text-gray-500 font-bold">
            HISTORIC STRIP
          </span>
        </div>

        {panel.narrativeCaption && (
          <div className="bg-[#FBBF24] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] px-2.5 py-1 text-[11px] font-mono font-black text-[#111827] tracking-wider uppercase rounded">
            {panel.narrativeCaption}
          </div>
        )}
      </div>

      {/* Main Panel Illustration / Halftone Area */}
      <div 
        className="relative flex-1 min-h-[160px] p-4 flex flex-col items-center justify-center border-b-2 border-[#111827] overflow-hidden"
        style={{ backgroundColor: panel.illustrationBgColor }}
      >
        {/* Halftone Ben-Day pattern overlay */}
        <div className="absolute inset-0 comic-halftone opacity-10 pointer-events-none" />

        {/* Scene Mascot / Glyph */}
        <div className="relative z-10 text-6xl drop-shadow-md select-none transform hover:scale-110 transition-transform">
          {panel.illustrationEmoji}
        </div>

        {/* Scene description subtitle */}
        <p className="relative z-10 mt-2 text-[11px] font-mono text-center text-gray-700 bg-white/80 px-2 py-0.5 rounded border border-[#111827] max-w-[90%]">
          {panel.panelScene}
        </p>

        {/* Skewed Action Sound Decal (e.g. "SWOOSH!", "YALLA!") */}
        {panel.soundEffect && (
          <div 
            className="absolute top-3 right-3 z-20 font-comic text-2xl tracking-wider text-white px-3 py-1 rounded-lg border-2 border-[#111827] shadow-[3px_3px_0px_#111827] select-none"
            style={{
              backgroundColor: panel.soundEffect.color,
              transform: `rotate(${panel.soundEffect.rotationDeg}deg)`
            }}
          >
            <span className="drop-shadow-[1px_1px_0px_#111827]">
              {panel.soundEffect.text}
            </span>
          </div>
        )}
      </div>

      {/* Speech & Thought Bubbles Container */}
      <div className="p-3 bg-white space-y-2 flex-1 flex flex-col justify-end">
        {panel.speechBubbles.map((bubble, i) => (
          <SpeechBubble key={i} bubble={bubble} />
        ))}
      </div>

    </div>
  );
};
