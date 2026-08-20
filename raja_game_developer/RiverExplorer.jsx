import React, { useState } from 'react';
import { Waves } from 'lucide-react';
import { Uniform } from '../../engine/statsEngine';

export default function RiverExplorer() {
  const [minVal, setMinVal] = useState(2);
  const [maxVal, setMaxVal] = useState(8);
  const [rangeA, setRangeA] = useState(4);
  const [rangeB, setRangeB] = useState(6);

  const pdfHeight = Uniform.pdf(minVal, maxVal, minVal);
  const intervalProb = Uniform.cdf(minVal, maxVal, rangeB) - Uniform.cdf(minVal, maxVal, rangeA);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">Sensor Min Depth (a): {minVal}m</label>
          <input type="range" min="0" max="5" value={minVal} onChange={e => {
            const v = parseInt(e.target.value);
            setMinVal(v);
            if (rangeA < v) setRangeA(v);
          }} className="w-full mt-2 accent-cyan-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">Sensor Max Depth (b): {maxVal}m</label>
          <input type="range" min="6" max="12" value={maxVal} onChange={e => {
            const v = parseInt(e.target.value);
            setMaxVal(v);
            if (rangeB > v) setRangeB(v);
          }} className="w-full mt-2 accent-cyan-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-indigo-400">Probe Range A: {rangeA}m</label>
          <input type="range" min={minVal} max={rangeB - 1} value={rangeA} onChange={e => setRangeA(parseInt(e.target.value))} className="w-full mt-2 accent-indigo-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-indigo-400">Probe Range B: {rangeB}m</label>
          <input type="range" min={rangeA + 1} max={maxVal} value={rangeB} onChange={e => setRangeB(parseInt(e.target.value))} className="w-full mt-2 accent-indigo-500 cursor-pointer" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-cyan-500/20 text-center">
        <h4 className="text-xs font-bold uppercase text-slate-300 mb-2">
          P({rangeA}m ≤ Depth ≤ {rangeB}m) = Area under PDF = {(intervalProb * 100).toFixed(1)}%
        </h4>

        <div className="h-40 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-end p-4">
          <div 
            className="h-24 bg-gradient-to-r from-cyan-600/30 via-indigo-600/60 to-cyan-600/30 rounded border-t-2 border-indigo-400 relative flex items-center justify-center transition-all duration-300"
            style={{ 
              marginLeft: `${(minVal / 12) * 100}%`,
              width: `${((maxVal - minVal) / 12) * 100}%` 
            }}
          >
            {/* Range Highlight */}
            <div 
              className="h-full bg-cyan-400/40 border-x border-cyan-300 shadow-glow-accent transition-all duration-300"
              style={{
                marginLeft: `${((rangeA - minVal) / (maxVal - minVal)) * 100}%`,
                width: `${((rangeB - rangeA) / (maxVal - minVal)) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
