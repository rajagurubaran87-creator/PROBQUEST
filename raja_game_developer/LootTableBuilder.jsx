import React, { useState } from 'react';
import { PackageCheck, BarChart3 } from 'lucide-react';

export default function LootTableBuilder() {
  const [pCommon, setPCommon] = useState(0.50);
  const [pRare, setPRare] = useState(0.30);
  const [pEpic, setPEpic] = useState(0.15);

  // Legendary completes sum = 1.0
  const pLegendary = Math.max(0, parseFloat((1 - pCommon - pRare - pEpic).toFixed(2)));

  const rarities = [
    { name: 'Common (x=1)', prob: pCommon, val: 1, color: 'from-slate-400 to-slate-200' },
    { name: 'Rare (x=2)', prob: pRare, val: 2, color: 'from-blue-500 to-cyan-400' },
    { name: 'Epic (x=3)', prob: pEpic, val: 3, color: 'from-purple-500 to-pink-500' },
    { name: 'Legendary (x=4)', prob: pLegendary, val: 4, color: 'from-amber-400 to-yellow-200' },
  ];

  // Cumulative probabilities CDF
  let cdfAcc = 0;
  const cdfList = rarities.map(r => {
    cdfAcc += r.prob;
    return { ...r, cdf: cdfAcc };
  });

  return (
    <div className="space-y-6">
      {/* Probability Allocation Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-300">Common Prob: {(pCommon * 100).toFixed(0)}%</label>
          <input type="range" min="0.10" max="0.70" step="0.05" value={pCommon} onChange={e => setPCommon(parseFloat(e.target.value))} className="w-full mt-2 accent-slate-400 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">Rare Prob: {(pRare * 100).toFixed(0)}%</label>
          <input type="range" min="0.05" max="0.50" step="0.05" value={pRare} onChange={e => setPRare(parseFloat(e.target.value))} className="w-full mt-2 accent-cyan-400 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-purple-400">Epic Prob: {(pEpic * 100).toFixed(0)}%</label>
          <input type="range" min="0.05" max="0.30" step="0.05" value={pEpic} onChange={e => setPEpic(parseFloat(e.target.value))} className="w-full mt-2 accent-purple-400 cursor-pointer" />
        </div>
      </div>

      {/* PMF & CDF Dual Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PMF Chart */}
        <div className="glass-panel p-4 rounded-xl border border-indigo-500/30">
          <h5 className="text-xs font-bold uppercase text-indigo-400 mb-3">Probability Mass Function PMF p(x)</h5>
          <div className="h-40 flex items-end gap-3 border-b border-l border-slate-700 p-2">
            {rarities.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className="text-[10px] font-mono text-slate-300 mb-1">{(r.prob * 100).toFixed(0)}%</span>
                <div 
                  className={`w-full bg-gradient-to-t ${r.color} rounded-t transition-all duration-300`} 
                  style={{ height: `${r.prob * 100}%` }}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1">x={r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CDF Step Function Chart */}
        <div className="glass-panel p-4 rounded-xl border border-cyan-500/30">
          <h5 className="text-xs font-bold uppercase text-cyan-400 mb-3">Cumulative Distribution Function CDF F(x) = P(X ≤ x)</h5>
          <div className="h-40 flex items-end gap-3 border-b border-l border-slate-700 p-2">
            {cdfList.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className="text-[10px] font-mono text-cyan-300 mb-1">{(r.cdf * 100).toFixed(0)}%</span>
                <div 
                  className="w-full bg-gradient-to-t from-cyan-600 to-emerald-400 rounded-t transition-all duration-300" 
                  style={{ height: `${r.cdf * 100}%` }}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1">x={r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
