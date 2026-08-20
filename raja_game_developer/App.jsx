import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MapHub from './components/MapHub';
import MiniGameContainer from './components/MiniGameContainer';
import FormulaCodex from './components/FormulaCodex';
import MasteryDashboard from './components/MasteryDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import { loadPlayerState, savePlayerState } from './data/mockState';
import { ZONES } from './data/zonesData';
import confetti from 'canvas-confetti';

export default function App() {
  const [playerState, setPlayerState] = useState(loadPlayerState);
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'codex' | 'mastery' | 'instructor'
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    savePlayerState(playerState);
  }, [playerState]);

  const handleSelectZone = (zone) => {
    setSelectedZone(zone);
  };

  const handleBackToMap = () => {
    setSelectedZone(null);
  };

  const handleCompleteZone = (zoneId, quizScore, quizTotal) => {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;

    // Trigger celebratory confetti burst!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback if confetti script not loaded
    }

    setPlayerState(prev => {
      const isAlreadyCompleted = prev.completedZoneIds.includes(zoneId);
      const newCompleted = isAlreadyCompleted ? prev.completedZoneIds : [...prev.completedZoneIds, zoneId];
      
      // Calculate next zone to unlock
      const currentIdx = ZONES.findIndex(z => z.id === zoneId);
      const nextZone = ZONES[currentIdx + 1];
      const newUnlocked = nextZone && !prev.unlockedZoneIds.includes(nextZone.id)
        ? [...prev.unlockedZoneIds, nextZone.id]
        : prev.unlockedZoneIds;

      // Add badge if not present
      const hasBadge = prev.badges.some(b => b.zoneId === zoneId);
      const newBadges = hasBadge ? prev.badges : [
        ...prev.badges,
        {
          id: `b-${zoneId}`,
          name: zone.badgeName,
          zoneId,
          earnedAt: new Date().toISOString().split('T')[0]
        }
      ];

      // Add XP & check Level up
      const addedXP = isAlreadyCompleted ? 50 : zone.xpReward;
      const totalXP = prev.xp + addedXP;
      const newLevel = Math.floor(totalXP / 500) + 1;

      return {
        ...prev,
        xp: totalXP,
        level: newLevel,
        completedZoneIds: newCompleted,
        unlockedZoneIds: newUnlocked,
        badges: newBadges,
        quizScores: {
          ...prev.quizScores,
          [zoneId]: { score: quizScore, total: quizTotal, percentage: Math.round((quizScore / quizTotal) * 100) }
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedZone(null);
        }} 
        playerState={playerState} 
      />

      {/* Main App Body */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto pb-12">
        {selectedZone ? (
          <MiniGameContainer 
            zone={selectedZone} 
            onBack={handleBackToMap}
            onCompleteZone={handleCompleteZone} 
          />
        ) : (
          <>
            {activeTab === 'map' && (
              <MapHub 
                playerState={playerState} 
                onSelectZone={handleSelectZone} 
              />
            )}

            {activeTab === 'codex' && (
              <FormulaCodex />
            )}

            {activeTab === 'mastery' && (
              <MasteryDashboard playerState={playerState} />
            )}

            {activeTab === 'instructor' && (
              <InstructorDashboard />
            )}
          </>
        )}
      </main>

      {/* Sleek Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 glass-panel mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>🎲 <strong>ProbQuest</strong> — Learn Probability & Random Variables Through Play</span>
          <span className="font-mono text-slate-400">Unit I & II Syllabus Coverage • Course Outcome CO1</span>
        </div>
      </footer>
    </div>
  );
}
