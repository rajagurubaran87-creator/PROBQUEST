import React from 'react';
import { ZONES } from '../data/zonesData';
import { Award, BarChart3, CheckCircle2, Star, Trophy } from 'lucide-react';

export default function MasteryDashboard({ playerState }) {
  const completedCount = playerState.completedZoneIds.length;
  const totalZones = ZONES.length;
  const overallMasteryPct = Math.round((completedCount / totalZones) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      
      {/* CO1 Attainment Hero Header */}
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 flex flex-wrap items-center justify-between gap-6 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-cyan-950/70">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-400 font-mono">Course Outcome CO1 Mastered</span>
          <h2 className="text-3xl font-extrabold text-white">Student Mastery Overview</h2>
          <p className="text-xs text-slate-400 mt-1">Discrete & Continuous Probability Concepts Progress</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Mastery</span>
            <span className="text-3xl font-extrabold text-cyan-400 font-mono glow-text-cyan">{overallMasteryPct}%</span>
          </div>
          <div className="text-center border-l border-slate-800 pl-6">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Quests</span>
            <span className="text-3xl font-extrabold text-indigo-400 font-mono">{completedCount}/{totalZones}</span>
          </div>
        </div>
      </div>

      {/* Badge Case Showcase */}
      <div>
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-amber-400" /> Earned Mastery Badges ({playerState.badges.length})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {playerState.badges.map(badge => (
            <div key={badge.id} className="glass-panel p-4 rounded-xl border border-amber-500/30 text-center shadow-glow-gold">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-xl text-slate-950 shadow-md">
                🏆
              </div>
              <h4 className="font-extrabold text-xs text-white mt-2">{badge.name}</h4>
              <span className="text-[9px] font-mono text-amber-400 block mt-0.5">{badge.earnedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-Topic Breakdown List */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" /> Topic-by-Topic Mastery Breakdown
        </h3>

        <div className="space-y-3">
          {ZONES.map(z => {
            const isDone = playerState.completedZoneIds.includes(z.id);
            const scoreData = playerState.quizScores[z.id];

            return (
              <div key={z.id} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'}`}>
                    {isDone ? '✓' : z.id.replace('z', '#')}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{z.title}</h4>
                    <span className="text-[10px] text-indigo-400 font-medium">{z.concept}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  {scoreData ? (
                    <span className="font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      Quiz: {scoreData.score}/{scoreData.total} ({scoreData.percentage}%)
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Not attempted</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
