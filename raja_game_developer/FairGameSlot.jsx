import React, { useState } from 'react';
import { Scale, Play } from 'lucide-react';
import { computeDiscreteEVAndVar } from '../../engine/statsEngine';

export default function FairGameSlot() {
  const [winAmt, setWinAmt] = useState(10);
  const [winProb, setWinProb] = useState(0.25);
  const [loseAmt, setLoseAmt] = useState(3);

  const outcomes = [winAmt, -loseAmt];
  const probs = [winProb, 1 - winProb];

  const stats = computeDiscreteEVAndVar(outcomes, probs);
  const isFair = Math.abs(stats.ev) < 0.05;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-emerald-400">Win Payout: +${winAmt}</label>
          <input type="range" min="2" max="25" value={winAmt} onChange={e => setWinAmt(parseInt(e.target.value))} className="w-full mt-2 accent-emerald-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-indigo-400">Win Chance P(Win): {(winProb * 100).toFixed(0)}%</label>
          <input type="range" min="0.05" max="0.50" step="0.05" value={winProb} onChange={e => setWinProb(parseFloat(e.target.value))} className="w-full mt-2 accent-indigo-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-rose-400">Loss Penalty: -${loseAmt}</label>
          <input type="range" min="1" max="10" value={loseAmt} onChange={e => setLoseAmt(parseInt(e.target.value))} className="w-full mt-2 accent-rose-500 cursor-pointer" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 text-center">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Expected Value E[X] & Risk Variance Var(X)</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 font-mono">
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block">E[X] Expected Winnings</span>
            <span className={`text-xl font-bold ${stats.ev > 0 ? 'text-emerald-400' : stats.ev < 0 ? 'text-rose-400' : 'text-amber-400'}`}>
              {stats.ev > 0 ? '+' : ''}${stats.ev.toFixed(2)}
            </span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block">Var(X) Variance (Risk)</span>
            <span className="text-xl font-bold text-cyan-400">{stats.variance.toFixed(2)}</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block">Standard Dev σ</span>
            <span className="text-xl font-bold text-indigo-400">${stats.stdDev.toFixed(2)}</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-xs font-semibold ${isFair ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' : stats.ev > 0 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`}>
          {isFair ? '⚖️ FAIR GAME! E[X] ≈ $0.00. Neither house nor player has an advantage.' : stats.ev > 0 ? '📈 PLAYER ADVANTAGE! Long-run profit per play = +$' + stats.ev.toFixed(2) : '📉 HOUSE EDGE! Long-run loss per play = -$' + Math.abs(stats.ev).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
