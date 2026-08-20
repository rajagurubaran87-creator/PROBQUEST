import React, { useState } from 'react';
import { Target, Sliders } from 'lucide-react';
import { Normal } from '../../engine/statsEngine';

export default function BellCurveArchery() {
  const [mean, setMean] = useState(100);
  const [stdDev, setStdDev] = useState(15);
  const [rangeMin, setRangeMin] = useState(85);
  const [rangeMax, setRangeMax] = useState(115);

  const prob = Normal.rangeProbability(mean, stdDev, rangeMin, rangeMax);
  const zMin = Normal.zScore(mean, stdDev, rangeMin);
  const zMax = Normal.zScore(mean, stdDev, rangeMax);

  // Generate continuous curve points
  const points = [];
  const startX = mean - 4 * stdDev;
  const endX = mean + 4 * stdDev;
  const step = (endX - startX) / 80;

  for (let x = startX; x <= endX; x += step) {
    const y = Normal.pdf(mean, stdDev, x);
    points.push({ x, y, inRange: x >= rangeMin && x <= rangeMax });
  }

  const maxY = Normal.pdf(mean, stdDev, mean);

  return (
    <div className="space-y-6">
      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Mean Target Score (μ): {mean}
          </label>
          <input 
            type="range" min="50" max="150" value={mean}
            onChange={(e) => {
              const m = parseInt(e.target.value);
              setMean(m);
              setRangeMin(m - stdDev);
              setRangeMax(m + stdDev);
            }}
            className="w-full mt-2 accent-indigo-500 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Standard Deviation (σ): {stdDev}
          </label>
          <input 
            type="range" min="5" max="30" value={stdDev}
            onChange={(e) => setStdDev(parseInt(e.target.value))}
            className="w-full mt-2 accent-cyan-500 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Range Min x1: {rangeMin} (Z1 = {zMin.toFixed(2)})
          </label>
          <input 
            type="range" min={mean - 3 * stdDev} max={rangeMax - 1} value={rangeMin}
            onChange={(e) => setRangeMin(parseInt(e.target.value))}
            className="w-full mt-2 accent-emerald-500 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Range Max x2: {rangeMax} (Z2 = {zMax.toFixed(2)})
          </label>
          <input 
            type="range" min={rangeMin + 1} max={mean + 3 * stdDev} value={rangeMax}
            onChange={(e) => setRangeMax(parseInt(e.target.value))}
            className="w-full mt-2 accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Shaded Area Probability HUD */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 p-4 rounded-xl border border-indigo-500/30 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold text-slate-400">Interval Probability P({rangeMin} ≤ X ≤ {rangeMax})</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono glow-text-cyan">
            {(prob * 100).toFixed(2)}%
          </div>
        </div>
        <div className="text-right font-mono text-xs text-slate-300">
          <div>Z-Interval: [{zMin.toFixed(2)}, {zMax.toFixed(2)}]</div>
          <div className="text-emerald-400 font-semibold">Empirical Rule ~ 68-95-99.7%</div>
        </div>
      </div>

      {/* Bell Curve Canvas Visualizer */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 text-center">
          Normal PDF N(μ={mean}, σ={stdDev}) Curve & Shaded Interval Area
        </h4>

        <div className="h-52 w-full flex items-end border-b border-l border-slate-700 relative p-2 overflow-hidden">
          {points.map((pt, i) => {
            const heightPct = (pt.y / maxY) * 90;
            return (
              <div key={i} className="flex-1 flex flex-col justify-end h-full relative group">
                <div 
                  className={`w-full transition-colors duration-200 ${
                    pt.inRange 
                      ? 'bg-gradient-to-t from-cyan-600/70 to-indigo-500/90 shadow-glow-accent' 
                      : 'bg-slate-800/40'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* X Axis Axis Indicators */}
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-2">
          <span>μ-3σ ({mean - 3 * stdDev})</span>
          <span>μ-1σ ({mean - stdDev})</span>
          <span className="text-indigo-400 font-bold">μ ({mean})</span>
          <span>μ+1σ ({mean + stdDev})</span>
          <span>μ+3σ ({mean + 3 * stdDev})</span>
        </div>
      </div>
    </div>
  );
}
