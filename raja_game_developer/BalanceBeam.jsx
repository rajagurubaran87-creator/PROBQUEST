import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

export default function BalanceBeam() {
  const [center, setCenter] = useState(10);
  const [spread, setSpread] = useState(4);

  const mean = center;
  const variance = (spread * spread) / 3;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-indigo-400">Centroid Fulcrum μ: {center}</label>
          <input type="range" min="4" max="16" value={center} onChange={e => setCenter(parseInt(e.target.value))} className="w-full mt-2 accent-indigo-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">PDF Spread Width: {spread}</label>
          <input type="range" min="2" max="8" value={spread} onChange={e => setSpread(parseInt(e.target.value))} className="w-full mt-2 accent-cyan-500 cursor-pointer" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 text-center">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4">Balancing Probability Mass: Mean μ = {mean} | Variance Var(X) = {variance.toFixed(2)}</h4>

        <div className="h-32 bg-slate-950 rounded-xl border border-slate-800 relative flex flex-col justify-end p-4 items-center">
          {/* Triangular PDF shape */}
          <div className="w-full max-w-md h-20 relative flex justify-center items-end">
            <svg className="w-full h-full overflow-visible">
              <polygon 
                points={`${(center - spread) * 20},80 ${center * 20},10 ${(center + spread) * 20},80`} 
                className="fill-indigo-500/40 stroke-indigo-400 stroke-2"
              />
            </svg>
          </div>
          {/* Beam */}
          <div className="w-full h-2 bg-slate-700 rounded-full mt-1 relative">
            {/* Fulcrum ▲ */}
            <div 
              className="absolute -bottom-3 text-amber-400 text-sm transform -translate-x-1/2 transition-all duration-300"
              style={{ left: `${(center / 20) * 100}%` }}
            >
              ▲
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
