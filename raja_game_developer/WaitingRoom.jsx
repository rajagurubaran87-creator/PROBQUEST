import React, { useState } from 'react';
import { Hourglass, Timer } from 'lucide-react';
import { Exponential } from '../../engine/statsEngine';

export default function WaitingRoom() {
  const [lambda, setLambda] = useState(0.2); // rate per min
  const [waitT, setWaitT] = useState(3); // minutes

  const probWaitLess = Exponential.cdf(lambda, waitT);
  const meanWait = Exponential.mean(lambda);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-indigo-400">Arrival Rate λ: {lambda}/min</label>
          <input type="range" min="0.05" max="0.50" step="0.05" value={lambda} onChange={e => setLambda(parseFloat(e.target.value))} className="w-full mt-2 accent-indigo-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">Threshold Wait t: {waitT} mins</label>
          <input type="range" min="1" max="10" value={waitT} onChange={e => setWaitT(parseInt(e.target.value))} className="w-full mt-2 accent-cyan-500 cursor-pointer" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 text-center">
        <h4 className="text-xs font-bold uppercase text-slate-300 mb-2">
          P(Waiting Time T ≤ {waitT} mins) = 1 - e^(-λt) = {(probWaitLess * 100).toFixed(1)}%
        </h4>
        <p className="text-xs font-mono text-indigo-300 mb-4">Average Wait Time E[T] = 1/λ = {meanWait.toFixed(1)} minutes</p>

        <div className="h-36 bg-slate-950 rounded-xl border border-slate-800 relative flex items-end p-2 border-b border-l">
          {/* Decay curve */}
          {Array.from({ length: 20 }).map((_, i) => {
            const x = i * 0.5;
            const pdf = Exponential.pdf(lambda, x);
            const maxPdf = lambda;
            const isLess = x <= waitT;

            return (
              <div key={i} className="flex-1 flex flex-col justify-end h-full">
                <div 
                  className={`w-full transition-all duration-300 ${isLess ? 'bg-cyan-500/80 shadow-glow-accent' : 'bg-slate-800/40'}`}
                  style={{ height: `${(pdf / maxPdf) * 90}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
