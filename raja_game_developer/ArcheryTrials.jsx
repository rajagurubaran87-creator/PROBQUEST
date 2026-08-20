import React, { useState } from 'react';
import { Target, Play, RotateCcw } from 'lucide-react';
import { Binomial, runMonteCarloTrials } from '../../engine/statsEngine';

export default function ArcheryTrials() {
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.60);
  const [trials, setTrials] = useState(1000);
  const [simData, setSimData] = useState(null);

  const mean = Binomial.mean(n, p);
  const variance = Binomial.variance(n, p);

  // Generate theoretical PMF dataset
  const theoPmf = [];
  for (let k = 0; k <= n; k++) {
    theoPmf.push({ k, prob: Binomial.pmf(n, p, k) });
  }

  const handleSimulate = () => {
    const sampler = () => Binomial.sample(n, p);
    const res = runMonteCarloTrials(sampler, trials);
    setSimData(res.counts);
  };

  return (
    <div className="space-y-6">
      {/* Parameter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Shots Volley (n): {n}
          </label>
          <input 
            type="range" min="5" max="25" value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full mt-2 accent-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Hit Chance (p): {(p * 100).toFixed(0)}%
          </label>
          <input 
            type="range" min="0.10" max="0.90" step="0.05" value={p}
            onChange={(e) => setP(parseFloat(e.target.value))}
            className="w-full mt-2 accent-cyan-500 cursor-pointer"
          />
        </div>
        <div className="flex items-end">
          <button 
            onClick={handleSimulate}
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-2 rounded-xl shadow-glow-primary transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            Simulate {trials} Volleys
          </button>
        </div>
      </div>

      {/* Distribution Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Expected Hits E[X]</span>
          <div className="text-lg font-bold text-indigo-400 font-mono">{mean.toFixed(2)}</div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Variance Var(X)</span>
          <div className="text-lg font-bold text-cyan-400 font-mono">{variance.toFixed(2)}</div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Std Dev σ</span>
          <div className="text-lg font-bold text-emerald-400 font-mono">{Math.sqrt(variance).toFixed(2)}</div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Mode (Peak Hits)</span>
          <div className="text-lg font-bold text-amber-400 font-mono">{Math.floor((n + 1) * p)}</div>
        </div>
      </div>

      {/* Binomial PMF Histogram Chart */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-bold uppercase text-slate-300">
            Binomial PMF B(n={n}, p={p}) Histogram & Theoretical Overlay
          </h4>
          <span className="text-[10px] font-mono text-cyan-400">Bar = Empirical | Line = Theoretical P(X=k)</span>
        </div>

        <div className="h-48 flex items-end gap-1 border-b border-l border-slate-700 p-2">
          {theoPmf.map(({ k, prob }) => {
            const empCount = simData ? (simData[k] || 0) : 0;
            const empProb = simData ? empCount / trials : 0;
            const maxProb = Math.max(...theoPmf.map(t => t.prob), 0.35);

            return (
              <div key={k} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip */}
                <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-slate-900 border border-indigo-500 text-[10px] font-mono p-1 rounded z-20 whitespace-nowrap text-slate-200">
                  <span>k={k} hits</span>
                  <span>Theo: {(prob * 100).toFixed(1)}%</span>
                  {simData && <span>Emp: {(empProb * 100).toFixed(1)}%</span>}
                </div>

                {/* Bars */}
                <div className="w-full flex items-end justify-center gap-0.5 h-36">
                  {/* Empirical Bar */}
                  {simData && (
                    <div 
                      className="w-1/2 bg-cyan-500/60 rounded-t transition-all duration-300"
                      style={{ height: `${(empProb / maxProb) * 100}%` }}
                    />
                  )}
                  {/* Theoretical Bar */}
                  <div 
                    className="w-1/2 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t shadow-glow-primary transition-all duration-300"
                    style={{ height: `${(prob / maxProb) * 100}%` }}
                  />
                </div>
                {/* X Axis Label */}
                <span className="text-[10px] font-mono text-slate-400 mt-1">{k}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
