import React, { useState } from 'react';
import { Disc, RotateCw } from 'lucide-react';
import { Uniform } from '../../engine/statsEngine';

export default function SpinnerWheel() {
  const [selectA, setSelectA] = useState(90);
  const [selectB, setSelectB] = useState(180);
  const [spunVal, setSpunVal] = useState(null);

  const prob = (selectB - selectA) / 360;

  const handleSpin = () => {
    const angle = Math.random() * 360;
    setSpunVal(angle);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">Angle Start a: {selectA}°</label>
          <input type="range" min="0" max={selectB - 10} value={selectA} onChange={e => setSelectA(parseInt(e.target.value))} className="w-full mt-2 accent-cyan-500 cursor-pointer" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-cyan-400">Angle End b: {selectB}°</label>
          <input type="range" min={selectA + 10} max="360" value={selectB} onChange={e => setSelectB(parseInt(e.target.value))} className="w-full mt-2 accent-cyan-500 cursor-pointer" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 text-center flex flex-col items-center">
        <h4 className="text-xs font-bold uppercase text-slate-300 mb-4">
          P({selectA}° ≤ Angle ≤ {selectB}°) = ({selectB} - {selectA})/360 = {(prob * 100).toFixed(1)}%
        </h4>

        <div className="relative w-40 h-40 rounded-full border-4 border-slate-700 bg-slate-950 flex items-center justify-center shadow-glow-primary">
          <Disc className="w-32 h-32 text-indigo-500/40 animate-spin-slow" />
          {spunVal !== null && (
            <div 
              className="absolute w-1 h-20 bg-amber-400 origin-bottom transform -translate-y-10"
              style={{ transform: `rotate(${spunVal}deg)` }}
            />
          )}
        </div>

        <button onClick={handleSpin} className="mt-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 text-white font-semibold px-6 py-2 rounded-xl flex items-center gap-2 shadow-glow-accent">
          <RotateCw className="w-4 h-4" /> Spin Dial
        </button>

        {spunVal !== null && (
          <div className="mt-3 text-xs font-mono text-cyan-300">
            Landed on {spunVal.toFixed(1)}° — {spunVal >= selectA && spunVal <= selectB ? '🎯 WIN! Inside selected arc.' : '❌ Missed target range.'}
          </div>
        )}
      </div>
    </div>
  );
}
