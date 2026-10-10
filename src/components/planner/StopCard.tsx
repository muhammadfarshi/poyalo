import React from 'react';
import { Clock, MapPin, AlertTriangle, AlertCircle, Sparkles, Sun, CloudRain } from 'lucide-react';
import { ItineraryStop, RealityCheckFlag } from '../../types/itinerary';

interface StopCardProps {
  stop: ItineraryStop;
  index: number;
  flags: RealityCheckFlag[];
  goldenHourTime?: string;
}

export const StopCard: React.FC<StopCardProps> = ({
  stop,
  index,
  flags,
  goldenHourTime
}) => {
  const stopFlags = flags.filter(f => f.stopId === stop.id);
  const hasErrors = stopFlags.some(f => f.severity === 'error');
  const hasWarnings = stopFlags.some(f => f.severity === 'warning');

  return (
    <div className={`relative bg-white border-2 border-[#111827] rounded-xl p-3.5 shadow-[3px_3px_0px_#111827] transition-all ${
      hasErrors 
        ? 'border-red-600 bg-red-50/40 shadow-[3px_3px_0px_#DC2626]' 
        : hasWarnings 
        ? 'border-amber-500 bg-amber-50/30' 
        : ''
    }`}>
      
      {/* Top Meta: Index, Category, Timing */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <span className="bg-[#111827] text-white font-mono font-black text-[10px] px-2 py-0.5 rounded">
            STOP 0{index + 1}
          </span>
          <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gray-100 border border-gray-300">
            {stop.category}
          </span>
          {stop.isOutdoor ? (
            <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
              Outdoor
            </span>
          ) : (
            <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-300">
              Indoor
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1 font-mono font-black text-xs text-[#111827] bg-[#FDFBF7] px-2.5 py-1 rounded-md border border-[#111827]">
          <Clock className="w-3.5 h-3.5 text-[#FF5722]" />
          <span>{stop.startTime} – {stop.endTime}</span>
        </div>
      </div>

      {/* Stop Title */}
      <div className="flex items-start justify-between">
        <h3 className="font-display font-black text-base text-[#111827]">
          {stop.name}
        </h3>
      </div>

      {/* Sunset Golden Hour Badge */}
      {stop.idealForSunset && (
        <div className="mt-1.5 inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-100 border border-amber-400 text-[11px] font-mono font-bold text-amber-900">
          <Sun className="w-3 h-3 text-amber-600" />
          <span>Scenic Sunset Point (Dubai Golden Hour: {goldenHourTime || '18:15'})</span>
        </div>
      )}

      {/* Notes */}
      {stop.notes && (
        <p className="mt-1 text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-300">
          {stop.notes}
        </p>
      )}

      {/* Audit Flags for this Stop */}
      {stopFlags.length > 0 && (
        <div className="mt-2.5 space-y-1.5 border-t border-gray-200 pt-2">
          {stopFlags.map((flag) => (
            <div 
              key={flag.id}
              className={`p-2 rounded-lg border text-xs font-mono ${
                flag.severity === 'error'
                  ? 'bg-red-100 border-red-400 text-red-900'
                  : 'bg-amber-100 border-amber-400 text-amber-900'
              }`}
            >
              <div className="flex items-center space-x-1 font-black">
                {flag.severity === 'error' ? (
                  <AlertCircle className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                )}
                <span>{flag.title}</span>
              </div>
              <p className="text-[11px] mt-0.5">{flag.message}</p>
              <p className="text-[10px] font-bold mt-1 text-[#FF5722] italic">
                🔥 Roast: "{flag.roastComment}"
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
