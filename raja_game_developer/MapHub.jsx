import React from 'react';
import { ZONES } from '../data/zonesData';
import { Lock, CheckCircle2, Star, Play, Sparkles } from 'lucide-react';

export default function MapHub({ playerState, onSelectZone }) {
  const unit1Zones = ZONES.filter(z => z.unit === 1);
  const unit2Zones = ZONES.filter(z => z.unit === 2);

  const renderZoneCard = (zone, index) => {
    const isUnlocked = playerState.unlockedZoneIds.includes(zone.id);
    const isCompleted = playerState.completedZoneIds.includes(zone.id);
    const quizScore = playerState.quizScores[zone.id];

    return (
      <div
        key={zone.id}
        onClick={() => isUnlocked && onSelectZone(zone)}
        className={`group relative glass-panel p-5 rounded-2xl border transition-all duration-300 ${
          isUnlocked
            ? 'cursor-pointer hover:border-indigo-500 hover:shadow-glow-primary hover:-translate-y-1'
            : 'opacity-50 cursor-not-allowed border-slate-800'
        } ${isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : ''}`}
      >
        {/* Node Badge / Index Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-mono font-bold text-indigo-300">
              #{index + 1}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {zone.unit === 1 ? 'Discrete' : 'Continuous'}
            </span>
          </div>

          <div>
            {isCompleted ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Done
              </span>
            ) : isUnlocked ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Unlocked
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                <Lock className="w-3.5 h-3.5" /> Locked
              </span>
            )}
          </div>
        </div>

        {/* Title & Concept */}
        <h3 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors">
          {zone.title}
        </h3>
        <p className="text-xs text-indigo-400 font-medium my-1">{zone.concept}</p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-2">
          {zone.mechanicDesc}
        </p>

        {/* Footer info: XP & Quiz Score */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="font-mono text-amber-400 font-semibold flex items-center gap-1">
            +{zone.xpReward} XP
          </span>
          {quizScore && (
            <span className="font-mono text-emerald-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-400" /> {quizScore.score}/{quizScore.total} Score
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6">
      
      {/* Welcome Hero Banner */}
      <div className="glass-card p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 shadow-glow-primary">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Probability Island Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master Probability Through Interactive Quests
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Journey across 15 interactive zones. Run live Monte Carlo simulations, adjust theoretical parameters, view auto-generated PMF/PDF curves, and complete adaptive quizzes to earn mastery badges!
          </p>
        </div>
      </div>

      {/* UNIT I SECTION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block shadow-glow-primary" />
              UNIT I — One-Dimensional Discrete Random Variables
            </h2>
            <p className="text-xs text-slate-400">Basic Probability, Bayes Theorem, Binomial, Poisson, Geometric Distributions</p>
          </div>
          <span className="text-xs font-mono text-indigo-400">9 Zones</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {unit1Zones.map((z, idx) => renderZoneCard(z, idx))}
        </div>
      </div>

      {/* UNIT II SECTION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-glow-accent" />
              UNIT II — One-Dimensional Continuous Random Variables
            </h2>
            <p className="text-xs text-slate-400">Continuous RVs, PDF/CDF, Uniform, Exponential, Normal Bell Curves</p>
          </div>
          <span className="text-xs font-mono text-cyan-400">6 Zones</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {unit2Zones.map((z, idx) => renderZoneCard(z, idx + 9))}
        </div>
      </div>

    </div>
  );
}
