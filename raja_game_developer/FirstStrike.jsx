import React, { useState } from 'react';
import { Flame, Play } from 'lucide-react';
import { Geometric, runMonteCarloTrials } from '../../engine/statsEngine';

export default function FirstStrike() {
  const [p, setP] = useState(0.20);
  const [trials, setTrials] = useState(1000);
  const [simData, setSimData] = useState(null);

  const meanWait = Geometric.mean(p);

  const theoPmf = [];
  for (let k = 1; k <= 10; k++) {
    theoPmf.push({ k, prob: Geometric.pmf(p, k) });
  }

  const handleRun = () => {
    const sampler = () => Geometric.sample(p);
    const res = runMonteCarloTrials(sampler, trials);
    setSimData(res.counts);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-amber-400">Critical Hit Chance (p): {(p * 100).toFixed(0)}%</label>
          <input type="range" min="0.05" max="0.50" step="0.05" value={p} onChange={e => setP(parseFloat(e.target.value))} className="w-full mt-2 accent-amber-500 cursor-pointer" />
        </div>
        <div className="flex items-end">
          <button onClick={handleRun} className="w-full bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 shadow-glow-gold">
            <Flame className="w-4 h-4" /> Simulate {trials} Battles
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-amber-500/20 text-center">
        <h4 className="text-xs font-bold uppercase text-slate-300 mb-2">Geometric Distribution: Expected Trials to 1st Success E[X] = 1/p = {meanWait.toFixed(1)}</h4>
        
        <div className="h-44 flex items-end gap-1 border-b border-l border-slate-700 p-2">
          {theoPmf.map(({ k, prob }) => {
            const empCount = simData ? (simData[k] || 0) : 0;
            const empProb = simData ? empCount / trials : 0;
            const maxProb = theoPmf[0].prob;

            return (
              <div key={k} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center gap-0.5 h-32">
                  {simData && <div className="w-1/2 bg-cyan-500/60 rounded-t" style={{ height: `${(empProb / maxProb) * 100}%` }} />}
                  <div className="w-1/2 bg-amber-500 rounded-t" style={{ height: `${(prob / maxProb) * 100}%` }} />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">k={k}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
