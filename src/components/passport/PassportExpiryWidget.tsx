import React, { useState, useEffect, useMemo } from 'react';
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
  Info,
  Sliders,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap
} from 'lucide-react';
import { evaluatePassportRules, COUNTRY_VISA_MATRIX } from '../../data/passportRules';

interface PassportExpiryWidgetProps {
  initialNationality?: string;
  initialDestination?: string;
  compact?: boolean;
  onSavedToPass?: () => void;
}

export const DEST_AIRPORT_MAP: Record<string, { code: string; name: string }> = {
  JP: { code: 'HND', name: 'TOKYO HANEDA' },
  FR: { code: 'CDG', name: 'PARIS CHARLES DE GAULLE' },
  US: { code: 'JFK', name: 'NEW YORK JFK' },
  GB: { code: 'LHR', name: 'LONDON HEATHROW' },
  AE: { code: 'DXB', name: 'DUBAI INTERNATIONAL' },
  TH: { code: 'BKK', name: 'BANGKOK SUVARNABHUMI' },
  SG: { code: 'SIN', name: 'SINGAPORE CHANGI' },
  OM: { code: 'MCT', name: 'MUSCAT INTERNATIONAL' },
  GE: { code: 'TBS', name: 'TBILISI INTERNATIONAL' },
  DE: { code: 'FRA', name: 'FRANKFURT AM MAIN' },
  IT: { code: 'FCO', name: 'ROME FIUMICINO' }
};

export const PassportExpiryWidget: React.FC<PassportExpiryWidgetProps> = ({
  initialNationality = 'IN',
  initialDestination = 'AE',
  compact = false,
  onSavedToPass
}) => {
  // Preset default dates: 30 days ahead for trip, ~400 days ahead for passport
  const today = new Date();
  const defaultTrip = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const defaultExpiry = new Date(today.getTime() + 400 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Load persisted widget settings from localStorage if available
  const [nationality, setNationality] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('poyalo_passport_widget_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.nationality) return parsed.nationality;
      }
    } catch {}
    return initialNationality;
  });

  const [destinationCountry, setDestinationCountry] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('poyalo_passport_widget_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.destinationCountry) return parsed.destinationCountry;
      }
    } catch {}
    return initialDestination;
  });

  const [tripStartDate, setTripStartDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('poyalo_passport_widget_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tripStartDate) return parsed.tripStartDate;
      }
    } catch {}
    return defaultTrip;
  });

  const [passportExpiryDate, setPassportExpiryDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('poyalo_passport_widget_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.passportExpiryDate) return parsed.passportExpiryDate;
      }
    } catch {}
    return defaultExpiry;
  });

  // Mode: widget view (glanceable card) vs studio editor (expanded controls)
  const [isEditorExpanded, setIsEditorExpanded] = useState<boolean>(!compact);
  const [copied, setCopied] = useState<boolean>(false);
  const [passSavedToast, setPassSavedToast] = useState<string | null>(null);
  const [isSynced, setIsSynced] = useState<boolean>(false);

  // Persist settings whenever inputs change
  useEffect(() => {
    try {
      localStorage.setItem('poyalo_passport_widget_data', JSON.stringify({
        nationality,
        destinationCountry,
        tripStartDate,
        passportExpiryDate
      }));
    } catch {}
  }, [nationality, destinationCountry, tripStartDate, passportExpiryDate]);

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

  // Validity buffer percentage for visual meter (clamped 0 to 100%, 180 days is ~49.3%)
  const meterPercentage = Math.min(100, Math.max(0, (evaluation.daysRemaining / 365) * 100));

  const handleCopySummary = () => {
    const summary = `🛡️ POYALO PASSPORT VALIDITY CHECK:\nNationality: ${nationality} ➔ Destination: ${destinationCountry}\nTrip Date: ${tripStartDate} | Expiry: ${passportExpiryDate}\nDays Remaining: ${evaluation.daysRemaining} days\nStatus: ${evaluation.valid ? 'VALID (Passed 180-Day Rule)' : 'INVALID / ALERT'}\nDetails: ${evaluation.message}\nVerified locally via POYALO.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveToPass = () => {
    try {
      // 1. Read existing boarding pass or fallback
      const defaultPass = {
        passengerName: 'ALEX CHEN',
        originCode: 'DXB',
        originName: 'INTERNATIONAL DEPARTURE',
        destCode: 'WORLD',
        destName: 'GLOBAL DESTINATION',
        trailName: 'GLOBAL HERITAGE EXPEDITION',
        seat: '09F',
        passClass: 'EXPLORER CLASS',
        date: '16 OCT 2026',
        bookingRef: 'POY-884920',
        verificationStatus: 'PASSPORT 180-DAY VALID'
      };

      let currentPass = defaultPass;
      const raw = localStorage.getItem('poyalo_boarding_pass');
      if (raw) {
        try {
          currentPass = { ...defaultPass, ...JSON.parse(raw) };
        } catch {}
      }

      // 2. Map destination country to airport metadata
      const destMeta = DEST_AIRPORT_MAP[destinationCountry] || {
        code: destinationCountry,
        name: `${destinationCountry} INTERNATIONAL`
      };

      // Format travel date for boarding pass
      let formattedDate = '16 OCT 2026';
      try {
        const d = new Date(tripStartDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }).toUpperCase();
        }
      } catch {}

      const verificationText = evaluation.valid
        ? `180-DAY VERIFIED (${evaluation.daysRemaining}D)`
        : `IMMIGRATION ALERT (${evaluation.daysRemaining}D)`;

      const syncPayload = {
        nationality,
        destinationCountry,
        tripStartDate,
        passportExpiryDate,
        daysRemaining: evaluation.daysRemaining,
        isValid: evaluation.valid,
        visaStatus: evaluation.visaStatus,
        syncedAt: new Date().toISOString()
      };

      const updatedPass = {
        ...currentPass,
        destCode: destMeta.code,
        destName: destMeta.name,
        date: formattedDate,
        verificationStatus: verificationText,
        passportSync: syncPayload
      };

      // 3. Persist to localStorage
      localStorage.setItem('poyalo_boarding_pass', JSON.stringify(updatedPass));
      localStorage.setItem('poyalo_verified_passport_days', evaluation.daysRemaining.toString());
      localStorage.setItem('poyalo_verified_destination', destinationCountry);

      // 4. Dispatch custom sync event & standard storage event for reactive updates
      window.dispatchEvent(new CustomEvent('poyalo:passport-sync', { detail: updatedPass }));
      window.dispatchEvent(new Event('storage'));

      setIsSynced(true);
      setPassSavedToast(`✅ Synced ${evaluation.daysRemaining} valid days to your Boarding Pass!`);
      setTimeout(() => setPassSavedToast(null), 4000);
    } catch (err) {
      console.error('Error syncing to boarding pass:', err);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-3xl p-4 sm:p-5 shadow-[5px_5px_0px_#111827] space-y-4 relative overflow-hidden transition-all">
      
      {/* Home Screen Widget Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#10B981] border-2 border-[#111827] shadow-[2px_2px_0px_#111827] flex items-center justify-center text-white font-black text-base flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap">
              <span className="font-display font-black text-xs sm:text-sm text-[#111827] uppercase tracking-wide">
                PASSPORT 180-DAY RADAR
              </span>
              <span className="bg-[#1B3FFF] text-white font-mono font-black text-[9px] px-1.5 py-0.2 rounded border border-[#111827]">
                HOME WIDGET
              </span>
              <span className="inline-flex items-center space-x-1 text-[9px] font-mono font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>LIVE</span>
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500">
              Deterministic 6-month international immigration compliance check
            </p>
          </div>
        </div>

        {/* Toggle Editor Controls */}
        <button
          type="button"
          onClick={() => setIsEditorExpanded(!isEditorExpanded)}
          className="px-2.5 py-1.5 bg-[#FDFBF7] hover:bg-gray-100 border-2 border-[#111827] rounded-xl text-[10px] font-mono font-black text-gray-800 flex items-center space-x-1 shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5"
          title="Toggle Date Editor"
        >
          <Sliders className="w-3 h-3 text-[#1B3FFF]" />
          <span>{isEditorExpanded ? 'COLLAPSE' : 'EDIT DATES'}</span>
          {isEditorExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* GLANCEABLE HOME SCREEN HERO METRIC CARD */}
      <div className={`p-4 rounded-2xl border-2 border-[#111827] shadow-[3px_3px_0px_#111827] transition-all ${
        evaluation.valid ? 'bg-[#F0FDF4]' : 'bg-[#FEF2F2]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Hero Days Countdown */}
          <div className="flex items-center space-x-3.5">
            <div className={`w-14 h-14 rounded-2xl border-2 border-[#111827] shadow-[2.5px_2.5px_0px_#111827] flex items-center justify-center text-3xl flex-shrink-0 ${
              evaluation.valid ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'
            }`}>
              {evaluation.valid ? '🛡️' : '🚨'}
            </div>

            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#111827] tracking-tight">
                  {evaluation.daysRemaining}
                </span>
                <span className="text-xs sm:text-sm font-mono font-black text-gray-700 uppercase">
                  DAYS VALIDITY
                </span>
              </div>

              <div className="flex items-center space-x-2 mt-0.5 flex-wrap gap-y-1">
                <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#111827] ${
                  evaluation.valid ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white animate-pulse'
                }`}>
                  {evaluation.valid ? '180-DAY RULE CLEARED' : 'IMMIGRATION DENIAL WARNING'}
                </span>

                <span className="text-[10px] font-mono font-black text-gray-700 bg-white px-1.5 py-0.5 rounded border border-gray-300">
                  {nationality} ➔ {destinationCountry}
                </span>
              </div>
            </div>
          </div>

          {/* Visa Status Stamp Box */}
          <div className="bg-white border-2 border-[#111827] px-3.5 py-2 rounded-xl shadow-[2px_2px_0px_#111827] text-left sm:text-right self-start sm:self-center">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase block">
              BORDER VISA ADVISORY:
            </span>
            <span className="font-display font-black text-xs text-[#1B3FFF]">
              {evaluation.visaStatus}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs font-mono font-bold text-gray-800 mt-2.5 pt-2 border-t border-black/10">
          {evaluation.message}
        </p>

        {/* Visual 180-Day Rule Meter */}
        <div className="mt-3 pt-2">
          <div className="flex items-center justify-between text-[9px] font-mono font-black text-gray-600 mb-1">
            <span>0 DAYS (EXPIRED)</span>
            <span className="text-[#FF5722] font-black underline">
              ▲ 180-DAY (6-MONTH) MANDATORY IMMIGRATION RULE
            </span>
            <span>365+ DAYS (SAFE)</span>
          </div>

          <div className="relative w-full h-4 bg-gray-200 border-2 border-[#111827] rounded-full overflow-hidden shadow-inner">
            {/* 180-Day Divider line */}
            <div className="absolute top-0 bottom-0 left-[49.3%] w-1 bg-[#111827] z-10" />
            
            {/* Active meter fill */}
            <div 
              className={`h-full transition-all duration-500 ${
                evaluation.valid 
                  ? 'bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse'
              }`}
              style={{ width: `${meterPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* EXPANDABLE STUDIO EDITOR (INPUTS & PRESETS) */}
      {isEditorExpanded && (
        <div className="space-y-3 pt-1 border-t-2 border-gray-100 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {/* Nationality */}
            <div>
              <label className="block text-[10px] font-mono font-black text-gray-700 uppercase mb-1">
                Your Nationality:
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
                <option value="DE">Germany (DE)</option>
                <option value="IT">Italy (IT)</option>
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
            <span className="text-[10px] font-mono font-black text-gray-500 uppercase mr-1">
              QUICK TEST PRESETS:
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
                className="px-2.5 py-1 bg-[#FDFBF7] hover:bg-amber-100 border border-[#111827] rounded-lg text-[10px] font-mono font-bold text-gray-800 shadow-[1px_1px_0px_#111827] active:translate-x-0.5"
              >
                {preset.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setTripStartDate(defaultTrip);
                setPassportExpiryDate(defaultExpiry);
              }}
              className="ml-auto text-[10px] font-mono font-bold text-gray-500 hover:text-[#111827] underline flex items-center space-x-1"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

        </div>
      )}

      {/* ACTION TOOLBAR: SYNC TO BOARDING PASS & SHARE */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-gray-600">
          <Info className="w-3.5 h-3.5 text-[#1B3FFF] flex-shrink-0" />
          <span>Zero sensitive numbers stored. 100% offline client-side validation.</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-2 bg-[#FDFBF7] hover:bg-gray-100 border-2 border-[#111827] rounded-xl text-xs font-mono font-black text-gray-800 shadow-[2px_2px_0px_#111827] active:translate-x-0.5 flex items-center space-x-1 min-h-[40px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY REPORT'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveToPass}
            className="px-4 py-2 bg-[#FBBF24] hover:bg-amber-300 border-2 border-[#111827] rounded-xl text-xs font-display font-black text-[#111827] shadow-[2.5px_2.5px_0px_#111827] active:translate-x-0.5 flex items-center space-x-1.5 min-h-[40px]"
          >
            <Zap className="w-3.5 h-3.5 text-[#111827]" />
            <span>SYNC TO BOARDING PASS</span>
          </button>
        </div>
      </div>

      {/* Sync Confirmation Toast & Direct Link to Boarding Pass */}
      {passSavedToast && (
        <div className="p-3 bg-emerald-100 border-2 border-[#111827] rounded-2xl text-emerald-950 text-xs font-mono font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[3px_3px_0px_#111827] animate-in fade-in duration-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{passSavedToast}</span>
          </div>

          {onSavedToPass && (
            <button
              type="button"
              onClick={onSavedToPass}
              className="px-3 py-1.5 bg-[#10B981] hover:bg-emerald-600 text-white border-2 border-[#111827] rounded-xl text-xs font-display font-black uppercase shadow-[2px_2px_0px_#111827] flex items-center space-x-1 whitespace-nowrap active:translate-x-0.5"
            >
              <span>VIEW IN BOARDING PASS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

    </div>
  );
};
