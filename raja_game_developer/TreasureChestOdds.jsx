import React, { useState } from 'react';
import { Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { runMonteCarloTrials } from '../../engine/statsEngine';

export default function TreasureChestOdds({ params = { gold: 3, silver: 7 }, onSimulate }) {
  const [gold, setGold] = useState(params.gold || 3);
  const [silver, setSilver] = useState(params.silver || 7);
  const [draws, setDraws] = useState(100);
  const [simResult, setSimResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = gold + silver;
  const theoGoldProb = total > 0 ? (gold / total) : 0;
  const theoSilverProb = total > 0 ? (silver / total) : 0;

  const handleRunSimulation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const sampler = () => (Math.random() < theoGoldProb ? 'Gold' : 'Silver');
      const res = runMonteCarloTrials(sampler, draws);
      const goldCount = res.counts['Gold'] || 0;
      const silverCount = res.counts['Silver'] || 0;
      setSimResult({
        goldCount,
        silverCount,
        empGoldProb: goldCount / draws,
        empSilverProb: silverCount / draws,
        total: draws
      });
      setIsAnimating(false);
      if (onSimulate) onSimulate();
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-400">Gold Coins (Favorable): {gold}</label>
          <input 
            type="range" min="1" max="15" value={gold} 
            onChange={(e) => setGold(parseInt(e.target.value))}
            className="w-full mt-2 accent-amber-400 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Silver Coins: {silver}</label>
          <input 
            type="range" min="1" max="15" value={silver} 
            onChange={(e) => setSilver(parseInt(e.target.value))}
            className="w-full mt-2 accent-slate-400 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Monte Carlo Draws: {draws}</label>
          <select 
            value={draws} 
            onChange={(e) => setDraws(parseInt(e.target.value))}
            className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200"
          >
            <option value={10}>10 Draws</option>
            <option value={100}>100 Draws</option>
            <option value={1000}>1,000 Draws</option>
            <option value={5000}>5,000 Draws</option>
          </select>
        </div>
      </div>

      {/* Visual Chest Grid */}
      <div className="relative glass-card p-6 rounded-2xl border border-indigo-500/20 text-center">
        <h4 className="text-sm font-medium text-slate-400 mb-4">Sample Space S (|S| = {total} items)</h4>
        <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
          {Array.from({ length: gold }).map((_, i) => (
            <div key={`g-${i}`} className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 shadow-glow-gold flex items-center justify-center text-slate-950 font-bold text-xs animate-pulse-slow">
              💰
            </div>
          ))}
          {Array.from({ length: silver }).map((_, i) => (
            <div key={`s-${i}`} className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-500 to-slate-300 shadow-md flex items-center justify-center text-slate-900 font-bold text-xs">
              🪙
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleRunSimulation}
          disabled={isAnimating}
          className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-glow-primary transition hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
          {isAnimating ? 'Drawing Chest Items...' : `Run ${draws} Draws`}
        </button>
      </div>

      {/* Results Comparison Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Theoretical */}
        <div className="glass-panel p-4 rounded-xl border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-indigo-400">Theoretical Probability P(E)</span>
            <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Exact</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-medium">P(Gold) = {gold}/{total}</span>
                <span className="font-mono text-amber-300">{(theoGoldProb * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" style={{ width: `${theoGoldProb * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">P(Silver) = {silver}/{total}</span>
                <span className="font-mono text-slate-300">{(theoSilverProb * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 transition-all duration-500" style={{ width: `${theoSilverProb * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Empirical */}
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-cyan-400">Empirical Frequency (Law of Large Numbers)</span>
            <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
              {simResult ? `${simResult.total} Trials` : 'Not run'}
            </span>
          </div>
          {simResult ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-400 font-medium">Empirical Gold: {simResult.goldCount}</span>
                  <span className="font-mono text-amber-300">{(simResult.empGoldProb * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-all duration-500" style={{ width: `${simResult.empGoldProb * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Empirical Silver: {simResult.silverCount}</span>
                  <span className="font-mono text-slate-300">{(simResult.empSilverProb * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 transition-all duration-500" style={{ width: `${simResult.empSilverProb * 100}%` }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center text-xs text-slate-500 italic">
              Click "Run Draws" to simulate Monte Carlo outcomes...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
