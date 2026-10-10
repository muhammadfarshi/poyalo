import React from 'react';
import { CalendarCheck, BookOpen, Gamepad2, ShieldCheck, Ticket } from 'lucide-react';

export type ActiveTab = 'planner' | 'comic' | 'game' | 'entry' | 'pass';

interface BottomDockProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  gameScore?: number;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  activeTab,
  onTabChange,
  gameScore = 0
}) => {
  const tabs = [
    {
      id: 'planner' as ActiveTab,
      label: 'PLANNER',
      icon: CalendarCheck,
      color: 'bg-[#1B3FFF] text-white',
      badge: 'AI'
    },
    {
      id: 'comic' as ActiveTab,
      label: 'COMIC LORE',
      icon: BookOpen,
      color: 'bg-[#FF5722] text-white',
      badge: 'ROAST'
    },
    {
      id: 'game' as ActiveTab,
      label: 'VG WORLD',
      icon: Gamepad2,
      color: 'bg-[#FBBF24] text-[#111827]',
      badge: `${gameScore > 0 ? gameScore + 'P' : '3D'}`
    },
    {
      id: 'entry' as ActiveTab,
      label: 'ENTRY CHECK',
      icon: ShieldCheck,
      color: 'bg-[#10B981] text-white',
      badge: 'VISA'
    },
    {
      id: 'pass' as ActiveTab,
      label: 'BOARDING PASS',
      icon: Ticket,
      color: 'bg-[#FFA07A] text-[#111827]'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7] border-t-[2.5px] border-[#111827] shadow-[0_-4px_10px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-2xl mx-auto px-2 py-1.5 flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[52px] rounded-xl transition-all duration-150 ${
                isActive
                  ? `${tab.color} border-2 border-[#111827] shadow-[3px_3px_0px_#111827] -translate-y-1 font-black`
                  : 'text-gray-700 hover:bg-gray-100 border border-transparent font-bold'
              }`}
            >
              {/* Optional tiny top badge */}
              {tab.badge && (
                <span className={`absolute -top-1.5 right-1 text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full border border-[#111827] shadow-[1px_1px_0px_#111827] ${
                  isActive ? 'bg-white text-[#111827]' : 'bg-[#FBBF24] text-[#111827]'
                }`}>
                  {tab.badge}
                </span>
              )}

              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight font-display mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
