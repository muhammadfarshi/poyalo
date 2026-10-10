import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BottomDock, ActiveTab } from './components/layout/BottomDock';
import { ItineraryPlanner } from './components/planner/ItineraryPlanner';
import { ComicStoryBox } from './components/comic/ComicStoryBox';
import { VGWorldGame } from './components/game/VGWorldGame';
import { EntryCheckView } from './components/planner/EntryCheckView';
import { BoardingPass } from './components/pass/BoardingPass';
import { MythPointerView } from './components/myth/MythPointerView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('planner');
  const [gameScore, setGameScore] = useState<number>(0);
  const [pearlsCollected, setPearlsCollected] = useState<number>(0);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [currentCity, setCurrentCity] = useState<string>('Dubai');

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleScoreUpdate = (score: number, pearls: number) => {
    setGameScore(score);
    setPearlsCollected(pearls);
  };

  const handleTeleportDemo = () => {
    // Quick toggle between planner and game for stage presentations
    if (activeTab === 'planner') {
      setActiveTab('game');
    } else if (activeTab === 'game') {
      setActiveTab('comic');
    } else if (activeTab === 'comic') {
      setActiveTab('myths');
    } else {
      setActiveTab('planner');
    }
  };

  const handleOpenMythsForCity = (city: string) => {
    setCurrentCity(city);
    setActiveTab('myths');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111827] flex flex-col font-display">
      
      {/* Neo-Brutalist Top Header */}
      <Header
        isOffline={isOffline}
        onTeleportDemo={handleTeleportDemo}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5">
        {activeTab === 'planner' && (
          <ItineraryPlanner 
            activeCity={currentCity}
            onOpenMyths={handleOpenMythsForCity} 
          />
        )}
        {activeTab === 'comic' && <ComicStoryBox />}
        {activeTab === 'myths' && (
          <MythPointerView 
            initialCity={currentCity}
            onSelectCity={setCurrentCity}
          />
        )}
        {activeTab === 'game' && <VGWorldGame onScoreUpdate={handleScoreUpdate} />}
        {activeTab === 'entry' && <EntryCheckView />}
        {activeTab === 'pass' && (
          <BoardingPass 
            gameScore={gameScore} 
            pearlsCollected={pearlsCollected} 
            itineraryScore={94} 
          />
        )}
      </main>

      {/* Persistent Bottom Mobile Dock */}
      <BottomDock
        activeTab={activeTab}
        onTabChange={setActiveTab}
        gameScore={gameScore}
      />

    </div>
  );
};

export default App;
