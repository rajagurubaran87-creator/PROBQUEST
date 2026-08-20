import React from 'react';
import { Map, BookOpen, Award, BarChart3, Flame, ShieldAlert, GraduationCap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, playerState }) {
  const currentXP = playerState.xp;
  const level = playerState.level;
  const xpForNextLevel = level * 500;
  const xpProgress = Math.min(100, (currentXP / xpForNextLevel) * 100);

  const tabs = [
    { id: 'map', label: 'Probability Island', icon: Map },
    { id: 'codex', label: 'Formula Codex', icon: BookOpen },
    { id: 'mastery', label: 'Mastery Dashboard', icon: BarChart3 },
    { id: 'instructor', label: 'Instructor Hub', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel-glow border-b border-indigo-500/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('map')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-glow-primary transition group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
              🎲
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-sans">
              Prob<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Quest</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">CO1 Discrete & Continuous RVs</p>
          </div>
        </div>

        {/* HUD Stats */}
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
          {/* Level & XP */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center font-mono font-bold text-indigo-300 text-xs">
              L{level}
            </div>
            <div className="w-28 sm:w-36">
              <div className="flex justify-between text-[10px] font-mono text-slate-300 mb-0.5">
                <span>{currentXP} XP</span>
                <span className="text-slate-500">{xpForNextLevel} XP</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 text-amber-400 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{playerState.streak}d</span>
          </div>

          {/* Badges Earned */}
          <div className="hidden sm:flex items-center gap-1 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 text-purple-300 font-bold text-xs">
            <Award className="w-4 h-4" />
            <span>{playerState.badges.length}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-glow-primary'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
