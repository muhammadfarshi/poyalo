import React from 'react';
import { Compass, Wifi, WifiOff, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  isOffline: boolean;
  onTeleportDemo?: () => void;
  activeCity?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isOffline = false,
  onTeleportDemo,
  activeCity = 'Worldwide'
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7] border-b-[2.5px] border-[#111827] px-4 py-2.5 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Brand & City */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-[#1B3FFF] text-white px-2.5 py-1 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_#111827] font-display font-black text-lg tracking-tight">
            POYALO
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-black text-xs text-[#111827] tracking-wider uppercase">
                പോയാലോ?
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FBBF24] border border-[#111827] text-[#111827]">
                <MapPin className="w-2.5 h-2.5 mr-0.5" />
                {activeCity}
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 hidden sm:block">
              Story-First Travel Companion
            </p>
          </div>
        </div>

        {/* Right Badges: Offline & Demo Teleport */}
        <div className="flex items-center space-x-2">
          {/* Offline / PWA Pill */}
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border-2 border-[#111827] text-[11px] font-mono font-bold shadow-[2px_2px_0px_#111827] ${
            isOffline ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
          }`}>
            {isOffline ? <WifiOff className="w-3 h-3 text-amber-700" /> : <Wifi className="w-3 h-3 text-emerald-700" />}
            <span className="hidden xs:inline">{isOffline ? 'AIRPLANE MODE' : 'OFFLINE PACK: SYNCED'}</span>
            <span className="xs:hidden">{isOffline ? 'OFFLINE' : 'SYNCED'}</span>
          </div>

          {/* Quick Demo Teleport Button */}
          {onTeleportDemo && (
            <button
              onClick={onTeleportDemo}
              title="Quickly fill chaotic sample itinerary for stage pitch"
              className="bg-[#FFA07A] hover:bg-[#FF885A] text-[#111827] px-2.5 py-1 rounded-full border-2 border-[#111827] text-[11px] font-mono font-bold shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 flex items-center space-x-1 transition-transform"
            >
              <Sparkles className="w-3 h-3 text-[#111827]" />
              <span className="hidden sm:inline">PITCH TELEPORT</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
