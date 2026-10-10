import React from 'react';
import { QrCode, Sparkles, Check, Share2, Award, Compass } from 'lucide-react';

interface BoardingPassProps {
  gameScore: number;
  pearlsCollected: number;
  itineraryScore?: number;
}

export const BoardingPass: React.FC<BoardingPassProps> = ({
  gameScore = 0,
  pearlsCollected = 0,
  itineraryScore = 94
}) => {
  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="bg-[#FFA07A] text-[#111827] px-2.5 py-0.5 rounded font-mono font-black text-xs uppercase border border-[#111827]">
          TRAVEL TOKEN • DIGITAL BOARDING PASS
        </span>
        <h1 className="text-2xl font-display font-black text-[#111827]">
          Your POYALO Boarding Stub
        </h1>
        <p className="text-xs font-mono text-gray-600">
          Your Travel Explorer Achievement Card
        </p>
      </div>

      {/* The Neo-Brutalist Vertical Boarding Pass */}
      <div className="relative bg-white border-[2.5px] border-[#111827] rounded-3xl overflow-hidden shadow-[6px_6px_0px_#111827]">
        
        {/* Pass Top Section */}
        <div className="p-5 bg-[#1B3FFF] text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono font-black text-xs tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
              POYALO • EXPLORER PASS
            </span>
            <span className="font-mono font-bold text-xs bg-[#FF5722] text-white px-2 py-0.5 rounded border border-[#111827]">
              SEAT 09F
            </span>
          </div>

          {/* Route Display */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-3xl font-display font-black tracking-tight">DXB</span>
              <p className="text-[10px] font-mono text-blue-200">SAMPLE CITY</p>
            </div>

            <div className="flex flex-col items-center">
              <Compass className="w-6 h-6 text-amber-300 animate-pulse" />
              <div className="w-16 h-[2px] bg-white/40 my-1" />
              <span className="text-[9px] font-mono text-blue-200">HERITAGE TRAIL</span>
            </div>

            <div className="text-right">
              <span className="text-3xl font-display font-black tracking-tight">CREEK</span>
              <p className="text-[10px] font-mono text-blue-200">AL FAHIDI DISTRICT</p>
            </div>
          </div>
        </div>

        {/* Middle Stats Grid */}
        <div className="p-4 bg-white grid grid-cols-2 gap-3 border-b-2 border-[#111827]">
          <div className="p-2.5 bg-[#FDFBF7] rounded-xl border border-gray-200">
            <span className="text-[10px] font-mono text-gray-500 font-bold block">REALITY CHECK</span>
            <span className="text-lg font-mono font-black text-emerald-600">{itineraryScore}/100</span>
            <p className="text-[9px] font-mono text-gray-500">Auto-repaired plan</p>
          </div>

          <div className="p-2.5 bg-[#FDFBF7] rounded-xl border border-gray-200">
            <span className="text-[10px] font-mono text-gray-500 font-bold block">VG WORLD SCORE</span>
            <span className="text-lg font-mono font-black text-[#FF5722]">{gameScore} PTS</span>
            <p className="text-[9px] font-mono text-gray-500">🦪 {pearlsCollected} Pearls Found</p>
          </div>
        </div>

        {/* Perforated Tear Line with Circular Notches */}
        <div className="relative py-2 bg-white flex items-center justify-center">
          {/* Left circular cutout notch */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#FDFBF7] border-[2.5px] border-[#111827] rounded-full" />
          
          {/* Dashed perforation */}
          <div className="w-[85%] border-b-2 border-dashed border-[#111827]" />

          {/* Right circular cutout notch */}
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#FDFBF7] border-[2.5px] border-[#111827] rounded-full" />
        </div>

        {/* Bottom Stub: QR Code & Verification */}
        <div className="p-5 bg-[#FDFBF7] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black text-gray-500 uppercase block">
              OFFICIAL VERIFICATION
            </span>
            <div className="flex items-center space-x-1.5 text-xs font-mono font-black text-[#111827]">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>PASSPORT 180-DAY VALID</span>
            </div>
            <p className="text-[10px] font-mono text-gray-500">
              Booking Ref: <strong className="text-[#111827]">POY-2026-DXB</strong>
            </p>
          </div>

          {/* Retro QR Block */}
          <div className="w-16 h-16 bg-white border-2 border-[#111827] rounded-xl p-1 shadow-[2px_2px_0px_#111827] flex items-center justify-center">
            <QrCode className="w-12 h-12 text-[#111827]" />
          </div>
        </div>

      </div>

      {/* Share / Save Pass Button */}
      <button 
        onClick={() => alert("Boarding Pass Token copied to clipboard! Ready to share with your group chat.")}
        className="w-full py-3 bg-[#111827] text-white border-2 border-[#111827] rounded-xl font-display font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#FF5722] flex items-center justify-center space-x-2 active:translate-x-0.5 active:translate-y-0.5"
      >
        <Share2 className="w-4 h-4" />
        <span>SHARE BOARDING PASS WITH TRIP GROUP</span>
      </button>

    </div>
  );
};
