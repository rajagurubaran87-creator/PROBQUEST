import React, { useState } from 'react';
import { Dices, Zap } from 'lucide-react';

export default function TwoDiceDuel() {
  const [trials, setTrials] = useState(1000);
  const [results, setResults] = useState(null);

  // Event A: Die 1 is Even {2, 4, 6} (P(A) = 0.50)
  // Event B: Die 2 is Greater than 4 {5, 6} (P(B) = 2/6 = 0.333)
  // P(A ∩ B) = P(Die 1 Even AND Die 2 > 4) = 3/6 * 2/6 = 6/36 = 1/6 ~ 16.67%

  const handleRoll = () => {
    let countA = 0;
    let countB = 0;
    let countAB = 0;

    for (let i = 0; i < trials; i++) {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const isA = d1 % 2 === 0;
      const isB = d2 > 4;

      if (isA) countA++;
      if (isB) countB++;
      if (isA && isB) countAB++;
    }

    setResults({
      pA: countA / trials,
      pB: countB / trials,
      pAB: countAB / trials,
      product: (countA / trials) * (countB / trials),
      total: trials
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold text-slate-400">Events Definition</span>
          <div className="text-xs text-slate-300 mt-1">
            <span className="text-indigo-400 font-semibold">Event A:</span> Die 1 is Even | 
            <span className="text-cyan-400 font-semibold ml-2">Event B:</span> Die 2 &gt; 4
          </div>
        </div>
        <button 
          onClick={handleRoll}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-glow-primary transition"
        >
          <Dices className="w-4 h-4" /> Roll {trials} Dice Pairs
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 text-center">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">
          Testing Independence Condition: P(A ∩ B) = P(A) × P(B)
        </h4>

        {results ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-indigo-500/30">
              <span className="text-xs text-indigo-400 font-bold block">P(A) Empirical</span>
              {(results.pA * 100).toFixed(1)}%
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-cyan-500/30">
              <span className="text-xs text-cyan-400 font-bold block">P(B) Empirical</span>
              {(results.pB * 100).toFixed(1)}%
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-emerald-500/30">
              <span className="text-xs text-emerald-400 font-bold block">P(A) × P(B) Product</span>
              {(results.product * 100).toFixed(1)}%
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 italic py-6">
            Click "Roll Dice Pairs" to run Monte Carlo independence trial...
          </div>
        )}

        {results && (
          <div className="mt-4 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            ⚡ Observed P(A ∩ B) = {(results.pAB * 100).toFixed(1)}% ≈ Product P(A)P(B) = {(results.product * 100).toFixed(1)}%. Events A and B are INDEPENDENT!
          </div>
        )}
      </div>
    </div>
  );
}
