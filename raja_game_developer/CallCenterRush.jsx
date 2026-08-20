import React, { useState } from 'react';
import { PhoneCall, Play } from 'lucide-react';
import { Poisson, runMonteCarloTrials } from '../../engine/statsEngine';

export default function CallCenterRush() {
  const [lambda, setLambda] = useState(4);
  const [trials, setTrials] = useState(1000);
  const [simData, setSimData] = useState(null);

  const theoPmf = [];
  for (let k = 0; k <= Math.max(12, lambda * 2); k++) {
    theoPmf.push({ k, prob: Poisson.pmf(lambda, k) });
  }

  const handleRun = () => {
    const sampler = () => Poisson.sample(lambda);
    const res = runMonteCarloTrials(sampler, trials);
    setSimData(res.counts);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-indigo-400">Average Rate (λ calls/min): {lambda}</label>
          <input type="range" min="1" max="10" value={lambda} onChange={e => setLambda(parseInt(e.target.value))} className="w-full mt-2 accent-indigo-500 cursor-pointer" />
        </div>
        <div className="flex items-end">
          <button onClick={handleRun} className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 shadow-glow-primary">
            <PhoneCall className="w-4 h-4" /> Simulate {trials} Intervals
          </button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20">
        <h4 className="text-xs font-bold uppercase text-slate-300 mb-3 text-center">Poisson Distribution P(X = k calls) with Mean λ = Var λ = {lambda}</h4>
        
        <div className="h-44 flex items-end gap-1 border-b border-l border-slate-700 p-2">
          {theoPmf.map(({ k, prob }) => {
            const empCount = simData ? (simData[k] || 0) : 0;
            const empProb = simData ? empCount / trials : 0;
            const maxProb = Math.max(...theoPmf.map(t => t.prob), 0.25);

            return (
              <div key={k} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center gap-0.5 h-32">
                  {simData && <div className="w-1/2 bg-cyan-500/60 rounded-t" style={{ height: `${(empProb / maxProb) * 100}%` }} />}
                  <div className="w-1/2 bg-indigo-600 rounded-t" style={{ height: `${(prob / maxProb) * 100}%` }} />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">{k}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
