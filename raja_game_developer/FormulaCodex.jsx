import React, { useState } from 'react';
import { ZONES } from '../data/zonesData';
import { BookOpen, Calculator, Search } from 'lucide-react';
import { nCr, Binomial, Poisson, Geometric, Uniform, Exponential, Normal } from '../engine/statsEngine';

export default function FormulaCodex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState(ZONES[0]);

  // Interactive Live Calculator state
  const [calcInputs, setCalcInputs] = useState({ n: 10, p: 0.5, k: 5, lambda: 3, mu: 100, sigma: 15, x: 115, a: 0, b: 10 });
  const [calcResult, setCalcResult] = useState(null);

  const filteredZones = ZONES.filter(z => 
    z.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    z.concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCalculate = () => {
    switch (selectedZone.id) {
      case 'z1':
      case 'z2':
      case 'z3':
        setCalcResult(`Combination nCr(10, 3) = ${nCr(10, 3)}`);
        break;
      case 'z7':
        const binomPmf = Binomial.pmf(calcInputs.n, calcInputs.p, calcInputs.k);
        setCalcResult(`Binomial P(X=${calcInputs.k}) = ${(binomPmf * 100).toFixed(2)}% | E[X] = ${Binomial.mean(calcInputs.n, calcInputs.p)}`);
        break;
      case 'z8':
        const poiPmf = Poisson.pmf(calcInputs.lambda, calcInputs.k);
        setCalcResult(`Poisson P(X=${calcInputs.k}) = ${(poiPmf * 100).toFixed(2)}% | Var(X) = ${calcInputs.lambda}`);
        break;
      case 'z9':
        const geoPmf = Geometric.pmf(calcInputs.p, calcInputs.k);
        setCalcResult(`Geometric P(X=${calcInputs.k}) = ${(geoPmf * 100).toFixed(2)}% | E[X] = ${Geometric.mean(calcInputs.p).toFixed(1)}`);
        break;
      case 'z12':
        const uniPdf = Uniform.pdf(calcInputs.a, calcInputs.b, calcInputs.x);
        setCalcResult(`Uniform PDF f(${calcInputs.x}) = ${uniPdf.toFixed(4)} | E[X] = ${Uniform.mean(calcInputs.a, calcInputs.b)}`);
        break;
      case 'z13':
        const expCdf = Exponential.cdf(calcInputs.lambda, calcInputs.x);
        setCalcResult(`Exponential CDF P(T ≤ ${calcInputs.x}) = ${(expCdf * 100).toFixed(2)}%`);
        break;
      case 'z14':
        const z = Normal.zScore(calcInputs.mu, calcInputs.sigma, calcInputs.x);
        const normCdf = Normal.cdf(calcInputs.mu, calcInputs.sigma, calcInputs.x);
        setCalcResult(`Z-Score = ${z.toFixed(2)} | Cumulative P(X ≤ ${calcInputs.x}) = ${(normCdf * 100).toFixed(2)}%`);
        break;
      default:
        setCalcResult('Formula ready.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" /> In-Game Formula Codex
          </h2>
          <p className="text-xs text-slate-400">Interactive Probability & Statistics Reference Notebook</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Search formulas or concepts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Topic List Sidebar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[600px] overflow-y-auto">
          {filteredZones.map(z => (
            <div
              key={z.id}
              onClick={() => { setSelectedZone(z); setCalcResult(null); }}
              className={`p-3 rounded-xl cursor-pointer transition border ${
                selectedZone.id === z.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">{z.unitTitle.split('—')[0]}</span>
              <div className="text-xs">{z.title}</div>
            </div>
          ))}
        </div>

        {/* Selected Formula Details & Interactive Calculator */}
        <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-indigo-500/20 space-y-6">
          <div>
            <span className="text-xs uppercase font-bold text-indigo-400">{selectedZone.unitTitle}</span>
            <h3 className="text-2xl font-extrabold text-white">{selectedZone.title}</h3>
            <p className="text-xs text-cyan-400 font-medium my-1">{selectedZone.concept}</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <span className="text-xs uppercase font-bold text-slate-400 block mb-2">Primary Theorem / Formula</span>
            <div className="text-xl font-mono text-cyan-300 font-bold">
              {selectedZone.formula}
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Calculator className="w-4 h-4 text-indigo-400" /> Interactive Formula Calculator
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400">n (trials): {calcInputs.n}</label>
                <input type="number" value={calcInputs.n} onChange={e => setCalcInputs({...calcInputs, n: parseInt(e.target.value) || 0})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400">p (prob): {calcInputs.p}</label>
                <input type="number" step="0.05" value={calcInputs.p} onChange={e => setCalcInputs({...calcInputs, p: parseFloat(e.target.value) || 0})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400">k / x value: {calcInputs.k}</label>
                <input type="number" value={calcInputs.k} onChange={e => setCalcInputs({...calcInputs, k: parseInt(e.target.value) || 0, x: parseInt(e.target.value) || 0})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200" />
              </div>
            </div>

            <button onClick={handleCalculate} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2 rounded-lg shadow-glow-primary transition">
              Evaluate Formula
            </button>

            {calcResult && (
              <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-lg text-xs font-mono text-cyan-300">
                {calcResult}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
