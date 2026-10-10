import React, { useState, useMemo } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Calendar, Globe, FileText, Lock } from 'lucide-react';
import { evaluatePassportRules, COUNTRY_VISA_MATRIX } from '../../data/passportRules';

export const EntryCheckView: React.FC = () => {
  const [nationality, setNationality] = useState<string>('IN');
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
      destinationCountry: 'United Arab Emirates'
    });
  }, [nationality, passportExpiryDate, tripStartDate]);

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto">
      
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
          Passport Expiry & UAE Visa Matrix
        </h1>
        <p className="text-xs sm:text-sm font-mono text-gray-700 mt-1">
          Verify your eligibility under the 180-day international rule before your trip to Dubai.
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
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

          {/* Trip Start Date */}
          <div>
            <label className="block text-[11px] font-mono font-black text-gray-700 uppercase mb-1">
              Trip Entry Date:
            </label>
            <input
              type="date"
              value={tripStartDate}
              onChange={(e) => setTripStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF]"
            />
          </div>

          {/* Passport Expiry Date */}
          <div>
            <label className="block text-[11px] font-mono font-black text-gray-700 uppercase mb-1">
              Passport Expiry Date:
            </label>
            <input
              type="date"
              value={passportExpiryDate}
              onChange={(e) => setPassportExpiryDate(e.target.value)}
              className="w-full px-3 py-2 bg-[#FDFBF7] border-2 border-[#111827] rounded-xl font-mono text-xs font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B3FFF]"
            />
          </div>

        </div>

        {/* Quick Expiry Test Pill: Toggle 3 months remaining to test red warning */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-[10px] font-mono text-gray-500 font-bold">Quick Stage Test:</span>
          <button
            onClick={() => setPassportExpiryDate('2026-12-01')} // < 180 days from Oct 2026!
            className="px-2 py-0.5 bg-red-100 border border-red-500 rounded text-[10px] font-mono font-bold text-red-900 active:bg-red-200"
          >
            Simulate 45 Days Expiry (Trigger Red Alert)
          </button>
          <button
            onClick={() => setPassportExpiryDate('2028-01-01')} // Good
            className="px-2 py-0.5 bg-emerald-100 border border-emerald-500 rounded text-[10px] font-mono font-bold text-emerald-900 active:bg-emerald-200"
          >
            Reset to Valid (2+ Years)
          </button>
        </div>
      </div>

      {/* Entry Check Result Card */}
      <div className={`border-[2.5px] border-[#111827] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111827] ${
        evaluation.valid ? 'bg-white' : 'bg-red-50'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-lg border-2 border-[#111827] font-mono font-black text-xs ${evaluation.badgeColor} shadow-[2px_2px_0px_#111827]`}>
              {evaluation.visaStatus}
            </span>
            <span className="text-xs font-mono font-bold text-gray-700">
              {evaluation.daysRemaining} Days Passport Buffer
            </span>
          </div>

          <span className={`text-[11px] font-mono font-black uppercase px-2 py-0.5 rounded border border-[#111827] ${
            evaluation.sixMonthsRulePassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {evaluation.sixMonthsRulePassed ? '6-MONTH RULE: PASSED ✅' : '6-MONTH RULE: FAILED ❌'}
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
            { key: 'hotelBooking' as const, label: 'Confirmed Accommodation / Hotel Booking Voucher in Dubai' },
            { key: 'travelInsurance' as const, label: 'Travel Health Insurance policy with UAE medical coverage' },
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
  );
};
