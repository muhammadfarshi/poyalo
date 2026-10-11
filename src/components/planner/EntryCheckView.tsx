import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Flame, 
  FileText
} from 'lucide-react';
import { VisaCompatibilityMatcher } from '../visa/VisaCompatibilityMatcher';
import { VisaStressScoreQuiz } from '../visa/VisaStressScoreQuiz';
import { PassportExpiryWidget } from '../passport/PassportExpiryWidget';

export type EntrySubTab = 'matrix' | 'matcher' | 'stress';

interface EntryCheckViewProps {
  onNavigateToPass?: () => void;
}

export const EntryCheckView: React.FC<EntryCheckViewProps> = ({ onNavigateToPass }) => {
  const [activeSubTab, setActiveSubTab] = useState<EntrySubTab>('matrix');

  // Interactive offline document checklist
  const [checklist, setChecklist] = useState({
    onwardTicket: true,
    hotelBooking: true,
    travelInsurance: false,
    fundsProof: true
  });

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
          <span>180-DAY PASSPORT WIDGET</span>
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

      {/* SUB-VIEW 3: 180-DAY PASSPORT EXPIRY WIDGET & IMMIGRATION CHECKLIST */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          
          {/* Main Passport Expiry Interactive Widget */}
          <PassportExpiryWidget onSavedToPass={onNavigateToPass} />

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
                { key: 'fundsProof' as const, label: 'Proof of Funds (Credit card or minimum 3,000 AED / local equivalent cash)' }
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
