import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Globe, 
  FileText, 
  Lock, 
  Sparkles, 
  Flame, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { evaluatePassportRules, COUNTRY_VISA_MATRIX } from '../../data/passportRules';
import { VisaCompatibilityMatcher } from '../visa/VisaCompatibilityMatcher';
import { VisaStressScoreQuiz } from '../visa/VisaStressScoreQuiz';

export type EntrySubTab = 'matrix' | 'matcher' | 'stress';

export const EntryCheckView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<EntrySubTab>('matrix');

  // 180-day passport evaluator state
  const [nationality, setNationality] = useState<string>('IN');
  const [destinationCountry, setDestinationCountry] = useState<string>('JP');
  const [passportExpiryDate, setPassportExpiryDate] = useState<string>('2027-05-15');
  const [tripStartDate, setTripStartDate] = useState<string>('2026-10-16');

  // Interactive offline document checklist
  const [checklist, setChecklist] = useState({
    onwardTicket: true,
    hotelBooking: true,
    travelInsurance: false,
    fundsProof: true
  });

  const evaluation = useMemo(() => {
    return evaluatePassportRules({
      nationality,
      passportExpiryDate,
      tripStartDate,
      destinationCountry
    });
  }, [nationality, destinationCountry, passportExpiryDate, tripStartDate]);

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      
      {/* Top Feature Switcher Pills */}
      <div className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-2 sm:p-2.5 shadow-[4px_4px_0px_#111827] flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-mono text-xs font-black transition-all border-2 border-[#111827] flex items-center justify-center space-x-2 min-h-[44px] ${
            activeSubTab === 'matrix'
              ? 'bg-[#10B981] text-white shadow-[3px_3px_0px_#111827] -translate-y-0.5'
              : 'bg-[#FDFBF7] text-[#111827] hover:bg-gray-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>180-DAY PASSPORT RULE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('matcher')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-mono text-xs font-black transition-all border-2 border-[#111827] flex items-center justify-center space-x-2 min-h-[44px] ${
            activeSubTab === 'matcher'
              ? 'bg-[#1B3FFF] text-white shadow-[3px_3px_0px_#111827] -translate-y-0.5'
              : 'bg-[#FDFBF7] text-[#111827] hover:bg-gray-100'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>VISA COMPATIBILITY</span>
          <span className="bg-[#FFA07A] text-[#111827] text-[9px] px-1.5 py-0.2 rounded font-black border border-[#111827]">
            MATCH
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('stress')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-mono text-xs font-black transition-all border-2 border-[#111827] flex items-center justify-center space-x-2 min-h-[44px] ${
            activeSubTab === 'stress'
              ? 'bg-[#FF5722] text-white shadow-[3px_3px_0px_#111827] -translate-y-0.5'
              : 'bg-[#FDFBF7] text-[#111827] hover:bg-gray-100'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>VISA STRESS QUIZ</span>
          <span className="bg-[#FBBF24] text-[#111827] text-[9px] px-1.5 py-0.2 rounded font-black border border-[#111827]">
            30 SEC
          </span>
        </button>
      </div>

      {/* SUB-VIEW 1: VISA COMPATIBILITY TRAVEL MATCHER */}
      {activeSubTab === 'matcher' && (
        <VisaCompatibilityMatcher />
      )}

      {/* SUB-VIEW 2: VISA STRESS SCORE QUIZ */}
      {activeSubTab === 'stress' && (
        <VisaStressScoreQuiz />
      )}

      {/* SUB-VIEW 3: 180-DAY PASSPORT RULE EVALUATION (DEFAULT) */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-[#FFFFFF] border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111827] relative overflow-hidden">
            <div className="flex items-center space-x-2">
              <span className="bg-[#10B981] text-white px-2.5 py-0.5 rounded font-mono font-black text-xs uppercase border border-[#111827]">
                THE VISA GUY • ENTRY CHECK
              </span>
              <span className="text-xs font-mono font-bold text-gray-500">
                Privacy Guaranteed • Zero PII Uploads
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#111827] mt-1 tracking-tight">
              Passport Expiry & Visa Matrix
            </h1>
            <p className="text-xs sm:text-sm font-mono text-gray-700 mt-1">
              Verify your eligibility under the 180-day international rule before your trip.
            </p>
          </div>

          {/* Input Parameters: Nationality & Expiry Date Only */}
          <div className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111827] space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-mono font-black text-[#111827] uppercase">
                TRAVELER CREDENTIALS INPUT:
              </span>
              <div className="flex items-center space-x-1 text-[11px] font-mono text-emerald-700 font-bold">
                <Lock className="w-3 h-3" />
                <span>Local IndexedDB Only</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              
              {/* Nationality Selector */}
              <div>
                <label className="block text-[11px] font-mono font-black text-gray-700 uppercase mb-1">
                  Your Nationality:
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF]"
                >
                  {Object.values(COUNTRY_VISA_MATRIX).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.countryName} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Country Selector */}
              <div>
                <label className="block text-[11px] font-mono font-black text-gray-700 uppercase mb-1">
                  Destination Country:
                </label>
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF]"
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

              {/* Trip Entry Date */}
              <div>
                <label className="block text-[11px] font-mono font-black text-gray-700 uppercase mb-1">
                  Planned Trip Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={tripStartDate}
                    onChange={(e) => setTripStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF]"
                  />
                </div>
              </div>

              {/* Passport Expiration Date */}
              <div>
                <label className="block text-[11px] font-mono font-black text-gray-700 uppercase mb-1">
                  Passport Expiry Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={passportExpiryDate}
                    onChange={(e) => setPassportExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF]"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Real-Time Rule Engine Evaluation Banner */}
          <div className={`border-[2.5px] border-[#111827] rounded-2xl p-5 shadow-[5px_5px_0px_#111827] transition-colors ${
            evaluation.valid ? 'bg-[#FFFFFF]' : 'bg-[#FEE2E2]'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {evaluation.valid ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 animate-bounce" />
                )}
                <div>
                  <h2 className="text-lg font-display font-black text-[#111827]">
                    {evaluation.valid ? 'PASSPORT ELIGIBILITY VERIFIED' : 'PASSPORT COMPLIANCE WARNING'}
                  </h2>
                  <p className="text-xs font-mono text-gray-600">
                    Rule: Minimum 180 days (6 months) validity required beyond departure.
                  </p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-black border-2 border-[#111827] ${
                evaluation.valid 
                  ? 'bg-emerald-100 text-emerald-900' 
                  : 'bg-red-200 text-red-900 animate-pulse'
              }`}>
                {evaluation.daysRemaining} DAYS REMAINING
              </span>
            </div>

            <p className={`text-xs sm:text-sm font-mono leading-relaxed p-3 rounded-xl border-2 border-[#111827] ${
              evaluation.valid 
                ? 'bg-[#FDFBF7] text-[#111827]' 
                : 'bg-red-100 text-red-900 font-bold'
            }`}>
              {evaluation.message}
            </p>
          </div>

          {/* Offline Immigration Document Checklist */}
          <div className="bg-white border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111827] space-y-3">
            <h3 className="font-display font-black text-base text-[#111827] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#FF5722]" />
              <span>IMMIGRATION OFFICER DESK CHECKLIST</span>
            </h3>
            <p className="text-xs font-mono text-gray-600">
              Airline check-in agents verify these 4 items before boarding:
            </p>

            <div className="space-y-2 pt-1">
              {[
                { key: 'onwardTicket' as const, label: 'Confirmed Onward / Return Airline Ticket' },
                { key: 'hotelBooking' as const, label: 'Confirmed Accommodation / Hotel Booking Voucher' },
                { key: 'travelInsurance' as const, label: 'Travel Health Insurance policy with destination medical coverage' },
                { key: 'fundsProof' as const, label: 'Proof of Funds (Credit card or minimum 3,000 AED cash/balance)' }
              ].map((item) => (
                <label
                  key={item.key}
                  onClick={() => toggleChecklist(item.key)}
                  className="flex items-center space-x-3 p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer select-none transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.key]}
                    onChange={() => {}}
                    className="w-4 h-4 rounded border-2 border-[#111827] text-[#1B3FFF] focus:ring-0"
                  />
                  <span className={`text-xs font-mono font-bold ${
                    checklist[item.key] ? 'text-[#111827]' : 'text-gray-400 line-through'
                  }`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
