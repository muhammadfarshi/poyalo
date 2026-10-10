import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Globe, 
  Clock, 
  Copy, 
  Check, 
  RotateCcw, 
  Plane,
  Sparkles,
  Info
} from 'lucide-react';
import { evaluatePassportRules, COUNTRY_VISA_MATRIX } from '../../data/passportRules';

interface PassportExpiryWidgetProps {
  initialNationality?: string;
  initialDestination?: string;
  compact?: boolean;
  onSavedToPass?: () => void;
}

export const PassportExpiryWidget: React.FC<PassportExpiryWidgetProps> = ({
  initialNationality = 'IN',
  initialDestination = 'JP',
  compact = false,
  onSavedToPass
}) => {
  // Preset dates: default to 1 year ahead for expiry, and 1 month ahead for trip
  const today = new Date();
  const defaultTrip = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultExpiry = new Date(today.getTime() + 400 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [nationality, setNationality] = useState<string>(initialNationality);
  const [destinationCountry, setDestinationCountry] = useState<string>(initialDestination);
  const [tripStartDate, setTripStartDate] = useState<string>(defaultTrip);
  const [passportExpiryDate, setPassportExpiryDate] = useState<string>(defaultExpiry);
  const [copied, setCopied] = useState<boolean>(false);
  const [passSavedToast, setPassSavedToast] = useState<string | null>(null);

  // Quick preset helper
  const applyPreset = (daysFromTrip: number) => {
    const trip = new Date(tripStartDate);
    const target = new Date(trip.getTime() + daysFromTrip * 24 * 60 * 60 * 1000);
    setPassportExpiryDate(target.toISOString().split('T')[0]);
  };

  const evaluation = useMemo(() => {
    return evaluatePassportRules({
      nationality,
      destinationCountry,
      tripStartDate,
      passportExpiryDate
    });
  }, [nationality, destinationCountry, tripStartDate, passportExpiryDate]);

  // Validity buffer percentage for visual meter (clamped 0 to 100%, 180 days is 50%)
  const meterPercentage = Math.min(100, Math.max(0, (evaluation.daysRemaining / 365) * 100));

  const handleCopySummary = () => {
    const summary = `🛡️ POYALO PASSPORT VALIDITY CHECK:\nNationality: ${nationality} ➔ Destination: ${destinationCountry}\nTrip Date: ${tripStartDate} | Expiry: ${passportExpiryDate}\nDays Remaining: ${evaluation.daysRemaining} days\nStatus: ${evaluation.valid ? 'VALID (Passed 180-Day Rule)' : 'INVALID / ALERT'}\nDetails: ${evaluation.message}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveToPass = () => {
    try {
      localStorage.setItem('poyalo_verified_passport_days', evaluation.daysRemaining.toString());
      localStorage.setItem('poyalo_verified_destination', destinationCountry);
      setPassSavedToast('✅ Verified validity synced to your Boarding Pass Stub!');
      if (onSavedToPass) onSavedToPass();
      setTimeout(() => setPassSavedToast(null), 3000);
    } catch {}
  };

  return (
    <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111827] space-y-4 relative overflow-hidden">
      
      {/* Widget Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-gray-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-[#10B981] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-black text-sm text-[#111827] uppercase tracking-wide">
                PASSPORT EXPIRY REALITY WIDGET
              </span>
              <span className="bg-[#FBBF24] text-[#111827] font-mono font-black text-[9px] px-1.5 py-0.2 rounded border border-[#111827]">
                180-DAY RULE
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500">
              Deterministic 6-month international immigration buffer verification
            </p>
          </div>
        </div>

        {/* Quick Reset Button */}
        <button
          type="button"
          onClick={() => {
            setTripStartDate(defaultTrip);
            setPassportExpiryDate(defaultExpiry);
          }}
          className="self-start sm:self-center px-2 py-1 bg-[#FDFBF7] hover:bg-gray-100 border border-[#111827] rounded-lg text-[10px] font-mono font-bold text-gray-700 flex items-center space-x-1"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>RESET DATES</span>
        </button>
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Nationality */}
        <div>
          <label className="block text-[10px] font-mono font-black text-gray-700 uppercase mb-1">
            Passport Nationality:
          </label>
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full px-2.5 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            {Object.values(COUNTRY_VISA_MATRIX).map((c) => (
              <option key={c.code} value={c.code}>
                {c.countryName} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Destination Country */}
        <div>
          <label className="block text-[10px] font-mono font-black text-gray-700 uppercase mb-1">
            Destination:
          </label>
          <select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            className="w-full px-2.5 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          >
            <option value="JP">Japan (JP)</option>
            <option value="FR">France / Schengen (FR)</option>
            <option value="US">United States (US)</option>
            <option value="GB">United Kingdom (GB)</option>
            <option value="AE">United Arab Emirates (AE)</option>
            <option value="TH">Thailand (TH)</option>
            <option value="SG">Singapore (SG)</option>
            <option value="OM">Oman (OM)</option>
            <option value="GE">Georgia (GE)</option>
          </select>
        </div>

        {/* Trip Departure Date */}
        <div>
          <label className="block text-[10px] font-mono font-black text-gray-700 uppercase mb-1">
            Trip Departure:
          </label>
          <input
            type="date"
            value={tripStartDate}
            onChange={(e) => setTripStartDate(e.target.value)}
            className="w-full px-2.5 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

        {/* Passport Expiry Date */}
        <div>
          <label className="block text-[10px] font-mono font-black text-gray-700 uppercase mb-1">
            Passport Expiry Date:
          </label>
          <input
            type="date"
            value={passportExpiryDate}
            onChange={(e) => setPassportExpiryDate(e.target.value)}
            className="w-full px-2.5 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          />
        </div>

      </div>

      {/* Quick Date Presets */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase mr-1">
          Quick Test Presets:
        </span>
        {[
          { label: '🟢 +1 Year (Safe)', days: 365 },
          { label: '🟡 +185 Days (Borderline)', days: 185 },
          { label: '🔴 +90 Days (Fails Rule)', days: 90 },
          { label: '❌ -10 Days (Expired)', days: -10 }
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(preset.days)}
            className="px-2 py-0.5 bg-[#FDFBF7] hover:bg-amber-100 border border-[#111827] rounded-md text-[10px] font-mono font-bold text-gray-800 shadow-[1px_1px_0px_#111827] active:translate-x-0.5"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Real-time Status Card & Visual Gauge */}
      <div className={`p-4 rounded-xl border-2 border-[#111827] shadow-[3px_3px_0px_#111827] transition-colors ${
        evaluation.valid ? 'bg-emerald-50' : 'bg-red-50'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center text-2xl ${
              evaluation.valid ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'
            }`}>
              {evaluation.valid ? '✅' : '🚨'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#111827] ${
                  evaluation.valid ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white animate-pulse'
                }`}>
                  {evaluation.valid ? '180-DAY RULE PASSED' : 'CRITICAL IMMIGRATION ALERT'}
                </span>
                <span className="font-mono font-black text-xs text-[#111827]">
                  {evaluation.daysRemaining} DAYS VALIDITY
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-gray-800 mt-1 max-w-xl">
                {evaluation.message}
              </p>
            </div>
          </div>

          {/* Visa Status Tag */}
          <div className="self-start sm:self-center bg-white border-2 border-[#111827] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#111827] text-right">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase block">
              BORDER VISA STATUS:
            </span>
            <span className="font-display font-black text-xs text-[#1B3FFF]">
              {evaluation.visaStatus}
            </span>
          </div>
        </div>

        {/* Visual 180-Day Rule Progress Bar Gauge */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-[10px] font-mono font-black text-gray-600 mb-1">
            <span>0 DAYS (EXPIRED)</span>
            <span className="text-[#FF5722] font-black underline">▲ 180-DAY (6-MONTH) MANDATORY RULE</span>
            <span>365+ DAYS (LONG-TERM)</span>
          </div>

          <div className="relative w-full h-4 bg-gray-200 border-2 border-[#111827] rounded-full overflow-hidden shadow-inner">
            {/* 180-Day Divider line */}
            <div className="absolute top-0 bottom-0 left-[49.3%] w-1 bg-[#111827] z-10" />
            
            {/* Active meter fill */}
            <div 
              className={`h-full transition-all duration-500 ${
                evaluation.valid 
                  ? 'bg-gradient-to-r from-amber-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse'
              }`}
              style={{ width: `${meterPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons: Copy Certificate & Save to Stub */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-gray-600">
          <Info className="w-3.5 h-3.5 text-[#1B3FFF]" />
          <span>Zero passport numbers stored. Checked locally in offline TypeScript.</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 bg-[#FDFBF7] hover:bg-gray-100 border-2 border-[#111827] rounded-xl text-xs font-mono font-bold text-gray-800 shadow-[2px_2px_0px_#111827] active:translate-x-0.5 flex items-center space-x-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY SUMMARY'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveToPass}
            className="px-3.5 py-1.5 bg-[#FBBF24] hover:bg-amber-300 border-2 border-[#111827] rounded-xl text-xs font-mono font-black text-[#111827] shadow-[2px_2px_0px_#111827] active:translate-x-0.5 flex items-center space-x-1.5"
          >
            <Plane className="w-3.5 h-3.5" />
            <span>SYNC TO BOARDING PASS</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {passSavedToast && (
        <div className="p-2 bg-emerald-100 border-2 border-[#111827] rounded-xl text-emerald-900 text-xs font-mono font-bold flex items-center space-x-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{passSavedToast}</span>
        </div>
      )}

    </div>
  );
};
