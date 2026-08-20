import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { calculateBayes } from '../../engine/statsEngine';

export default function MedicalLab() {
  const [prior, setPrior] = useState(0.01); // 1%
  const [sensitivity, setSensitivity] = useState(0.95); // 95%
  const [falsePos, setFalsePos] = useState(0.05); // 5%

  const bayes = calculateBayes(prior, sensitivity, falsePos);

  return (
    <div className="space-y-6">
      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Disease Prior P(D): {(prior * 100).toFixed(1)}%
          </label>
          <input 
            type="range" min="0.001" max="0.20" step="0.001" value={prior}
            onChange={(e) => setPrior(parseFloat(e.target.value))}
            className="w-full mt-2 accent-rose-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 mt-1">Prevalence in general population</p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Test Sensitivity P(+|D): {(sensitivity * 100).toFixed(0)}%
          </label>
          <input 
            type="range" min="0.50" max="0.99" step="0.01" value={sensitivity}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            className="w-full mt-2 accent-emerald-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 mt-1">True Positive detection rate</p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            False Positive Rate P(+|~D): {(falsePos * 100).toFixed(0)}%
          </label>
          <input 
            type="range" min="0.01" max="0.20" step="0.01" value={falsePos}
            onChange={(e) => setFalsePos(parseFloat(e.target.value))}
            className="w-full mt-2 accent-amber-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 mt-1">Healthy subjects testing positive</p>
        </div>
      </div>

      {/* Bayes Probability Tree Visualizer */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 text-center">
          Bayesian Probability Tree & Population Breakdown (Out of 10,000 People)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          {/* Disease Group */}
          <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/30">
            <span className="text-xs font-bold uppercase text-rose-400">Diseased Group (100 people)</span>
            <div className="text-2xl font-bold text-rose-300 my-2">{(prior * 10000).toFixed(0)}</div>
            <div className="text-xs space-y-1 text-slate-300">
              <div className="text-emerald-400 font-semibold">
                True Positives: {Math.round(prior * 10000 * sensitivity)}
              </div>
              <div className="text-slate-400">
                False Negatives: {Math.round(prior * 10000 * (1 - sensitivity))}
              </div>
            </div>
          </div>

          {/* Healthy Group */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold uppercase text-slate-400">Healthy Group</span>
            <div className="text-2xl font-bold text-slate-200 my-2">{Math.round((1 - prior) * 10000)}</div>
            <div className="text-xs space-y-1 text-slate-300">
              <div className="text-amber-400 font-semibold">
                False Positives: {Math.round((1 - prior) * 10000 * falsePos)}
              </div>
              <div className="text-slate-400">
                True Negatives: {Math.round((1 - prior) * 10000 * (1 - falsePos))}
              </div>
            </div>
          </div>
        </div>

        {/* Updated Posterior Outcome */}
        <div className="mt-6 bg-gradient-to-r from-indigo-950 to-purple-950 p-4 rounded-xl border border-indigo-500/40 text-center shadow-glow-primary">
          <span className="text-xs uppercase font-bold text-indigo-300">Updated Belief P(Disease | Positive Test)</span>
          <div className="text-3xl font-extrabold text-cyan-400 my-1 font-mono glow-text-cyan">
            {(bayes.pAgivenB * 100).toFixed(2)}%
          </div>
          <p className="text-xs text-slate-300 max-w-lg mx-auto mt-1">
            Even with a {(sensitivity * 100).toFixed(0)}% accurate test, because the disease is rare ({(prior * 100).toFixed(1)}%), a positive result only means a {(bayes.pAgivenB * 100).toFixed(1)}% chance of actually having the disease!
          </p>
        </div>
      </div>
    </div>
  );
}
