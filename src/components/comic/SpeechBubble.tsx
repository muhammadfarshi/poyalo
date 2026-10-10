import React from 'react';
import { ComicSpeechBubble } from '../../types/comic';

interface SpeechBubbleProps {
  bubble: ComicSpeechBubble;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ bubble }) => {
  const isShout = bubble.type === 'shout';
  const isThought = bubble.type === 'thought';

  return (
    <div className={`relative my-2 max-w-[90%] sm:max-w-[85%] ${
      bubble.pointerDirection === 'bottom-right' ? 'ml-auto' : 'mr-auto'
    }`}>
      {/* Speaker Tag */}
      <div className={`flex items-center space-x-1 mb-1 text-[11px] font-mono font-bold ${
        bubble.pointerDirection === 'bottom-right' ? 'justify-end' : 'justify-start'
      }`}>
        {bubble.avatarEmoji && <span className="text-sm">{bubble.avatarEmoji}</span>}
        <span className="bg-[#111827] text-white px-1.5 py-0.5 rounded text-[10px] tracking-wide">
          {bubble.speaker}
        </span>
      </div>

      {/* Bubble Container */}
      <div className={`relative px-3.5 py-2.5 bg-white border-2 border-[#111827] shadow-[3px_3px_0px_#111827] text-xs sm:text-sm font-display text-[#111827] leading-snug ${
        isThought
          ? 'rounded-3xl border-dashed'
          : isShout
          ? 'rounded-xl bg-amber-50 font-black tracking-wide border-[2.5px]'
          : 'rounded-2xl'
      } ${
        bubble.pointerDirection === 'bottom-left' ? 'speech-tail-bottom-left' : ''
      } ${
        bubble.pointerDirection === 'bottom-right' ? 'speech-tail-bottom-right' : ''
      }`}>
        <p>{bubble.text}</p>
      </div>
    </div>
  );
};
