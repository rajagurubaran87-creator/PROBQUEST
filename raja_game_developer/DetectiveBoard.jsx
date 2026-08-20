import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, CheckCircle2, RefreshCw, AlertTriangle, Eye, Sparkles, HelpCircle, Key, Cpu, Flame, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

// 6 Suspect Profiles with rich multi-trait combinations
const SUSPECTS = [
  {
    id: 't1',
    name: 'Sly Fox',
    alias: 'The Lockpicker',
    icon: '🦊',
    color: 'from-amber-500 to-orange-600',
    traits: {
      handedness: 'Left',
      bootSize: 10,
      bloodType: 'O',
      heightCategory: 'Medium', // 5'10"
      tattoo: 'Snake',
      favoriteTool: 'Lockpick'
    }
  },
  {
    id: 't2',
    name: 'Shadow Jack',
    alias: 'The Acrobat',
    icon: '🗡️',
    color: 'from-purple-600 to-indigo-600',
    traits: {
      handedness: 'Right',
      bootSize: 10,
      bloodType: 'A',
      heightCategory: 'Tall',   // 6'1"
      tattoo: 'Dragon',
      favoriteTool: 'Laser'
    }
  },
  {
    id: 't3',
    name: 'Viper Vance',
    alias: 'The Demolitionist',
    icon: '🐍',
    color: 'from-emerald-500 to-teal-600',
    traits: {
      handedness: 'Left',
      bootSize: 8,
      bloodType: 'B',
      heightCategory: 'Short',  // 5'7"
      tattoo: 'None',
      favoriteTool: 'Explosives'
    }
  },
  {
    id: 't4',
    name: 'Ghost Cat',
    alias: 'The Safe Cracker',
    icon: '🐱',
    color: 'from-pink-500 to-rose-600',
    traits: {
      handedness: 'Right',
      bootSize: 8,
      bloodType: 'O',
      heightCategory: 'Short',  // 5'6"
      tattoo: 'Cat',
      favoriteTool: 'Stethoscope'
    }
  },
  {
    id: 't5',
    name: 'Falcon Rex',
    alias: 'The Cyber Hacker',
    icon: '🦅',
    color: 'from-cyan-500 to-blue-600',
    traits: {
      handedness: 'Left',
      bootSize: 11,
      bloodType: 'AB',
      heightCategory: 'Tall',   // 6'2"
      tattoo: 'Falcon',
      favoriteTool: 'Cyber Deck'
    }
  },
  {
    id: 't6',
    name: 'Wolf Grim',
    alias: 'The Enforcer',
    icon: '🐺',
    color: 'from-slate-600 to-gray-800',
    traits: {
      handedness: 'Right',
      bootSize: 11,
      bloodType: 'A',
      heightCategory: 'Tall',   // 6'3"
      tattoo: 'Wolf',
      favoriteTool: 'Crowbar'
    }
  }
];

export default function DetectiveBoard() {
  const [guiltyId, setGuiltyId] = useState('t1');
  const [caseClues, setCaseClues] = useState([]);
  const [discoveredClueIds, setDiscoveredClueIds] = useState([]);
  const [accusedId, setAccusedId] = useState(null);
  const [isCaseSolved, setIsCaseSolved] = useState(false);
  const [showMathDetails, setShowMathDetails] = useState(true);

  // Generate 6 dynamic crime scene evidence items based on the randomly chosen guilty thief
  const generateCaseForGuiltyThief = (targetGuiltyId) => {
    const thief = SUSPECTS.find(s => s.id === targetGuiltyId) || SUSPECTS[0];

    const generatedClues = [
      {
        id: 'c_hand',
        type: 'Handedness',
        name: `${thief.traits.handedness}-Handed Palm Print`,
        icon: thief.traits.handedness === 'Left' ? '✋' : '🤚',
        location: 'Vault Outer Handle',
        desc: `Forensic dust reveals a distinct ${thief.traits.handedness}-handed palm grip pattern.`,
        getLikelihood: (s) => s.traits.handedness === thief.traits.handedness ? 0.90 : 0.10
      },
      {
        id: 'c_boot',
        type: 'Boot Size',
        name: `Size ${thief.traits.bootSize} Muddy Boot Tread`,
        icon: '🥾',
        location: 'Escape Window Sill',
        desc: `Soil compression depth measures exact Size ${thief.traits.bootSize} boot dimensions.`,
        getLikelihood: (s) => s.traits.bootSize === thief.traits.bootSize ? 0.88 : 0.12
      },
      {
        id: 'c_blood',
        type: 'Blood Specimen',
        name: `Blood Type ${thief.traits.bloodType} DNA Trace`,
        icon: '🩸',
        location: 'Laser Grid Glass Edge',
        desc: `Blood droplet typing confirms Blood Group ${thief.traits.bloodType}.`,
        getLikelihood: (s) => s.traits.bloodType === thief.traits.bloodType ? 0.95 : 0.05
      },
      {
        id: 'c_height',
        type: 'Height Tripwire',
        name: `Laser Tripwire Height: ${thief.traits.heightCategory}`,
        icon: '📏',
        location: 'Corridor Security Beam',
        desc: `Infrared laser broken at height zone categorized as ${thief.traits.heightCategory}.`,
        getLikelihood: (s) => s.traits.heightCategory === thief.traits.heightCategory ? 0.85 : 0.15
      },
      {
        id: 'c_tattoo',
        type: 'Tattoo Micro-Fiber',
        name: `${thief.traits.tattoo !== 'None' ? thief.traits.tattoo + ' Ink Fiber' : 'No Tattoo Fiber'}`,
        icon: '🎨',
        location: 'Ventilation Shaft Catch',
        desc: `Microscopic textile scrap contains ${thief.traits.tattoo !== 'None' ? thief.traits.tattoo + ' pigment tattoo ink' : 'clean unpigmented fiber'}.`,
        getLikelihood: (s) => s.traits.tattoo === thief.traits.tattoo ? 0.92 : 0.08
      },
      {
        id: 'c_tool',
        type: 'Tool Residue',
        name: `${thief.traits.favoriteTool} Tool Scratches`,
        icon: '🔧',
        location: 'Inner Safe Lock Plate',
        desc: `Tool mark examination reveals unique microscopic wear from a ${thief.traits.favoriteTool}.`,
        getLikelihood: (s) => s.traits.favoriteTool === thief.traits.favoriteTool ? 0.96 : 0.04
      }
    ];

    setCaseClues(generatedClues);
    setDiscoveredClueIds([]);
    setAccusedId(null);
    setIsCaseSolved(false);
  };

  useEffect(() => {
    generateCaseForGuiltyThief(guiltyId);
  }, [guiltyId]);

  // Calculate Bayesian Probabilities for 6 suspects across 6 clues
  const calculatePosteriors = () => {
    const prior = 1 / 6; // Equal initial prior P(T_i) = 1/6 ≈ 16.67%
    let totalJoint = 0;
    const jointMap = {};

    SUSPECTS.forEach(s => {
      let joint = prior;
      discoveredClueIds.forEach(clueId => {
        const clue = caseClues.find(c => c.id === clueId);
        if (clue) {
          joint *= clue.getLikelihood(s);
        }
      });
      jointMap[s.id] = joint;
      totalJoint += joint;
    });

    const posteriors = {};
    SUSPECTS.forEach(s => {
      posteriors[s.id] = totalJoint > 0 ? (jointMap[s.id] / totalJoint) : prior;
    });

    return posteriors;
  };

  const posteriors = calculatePosteriors();

  const handleToggleClue = (clueId) => {
    if (isCaseSolved) return;
    setDiscoveredClueIds(prev => 
      prev.includes(clueId) ? prev.filter(id => id !== clueId) : [...prev, clueId]
    );
  };

  const handleAccuse = (suspectId) => {
    setAccusedId(suspectId);
    setIsCaseSolved(true);
    if (suspectId === guiltyId) {
      try {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleNewCase = () => {
    const nextGuiltyId = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)].id;
    setGuiltyId(nextGuiltyId);
    generateCaseForGuiltyThief(nextGuiltyId);
  };

  const guiltySuspect = SUSPECTS.find(s => s.id === guiltyId);

  return (
    <div className="space-y-8">
      {/* Game Title Header */}
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 flex flex-wrap justify-between items-center gap-4 shadow-glow-primary">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> High-Complexity Mystery: 6 Suspects & 6 Forensic Clues
          </div>
          <h3 className="text-2xl font-extrabold text-white">The Master Bank Robbery — Bayesian Deduction</h3>
          <p className="text-xs text-slate-300 mt-1">
            Six master criminals are under suspicion. Inspect 6 forensic evidence sites to compute multi-variable Bayesian probability $P(\text{Thief}_i \mid C_1, C_2, C_3, C_4, C_5, C_6)$.
          </p>
        </div>

        <button 
          onClick={handleNewCase}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-glow-accent transition hover:scale-105"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" /> Generate Random 6-Thief Case
        </button>
      </div>

      {/* 6 Crime Scene Forensic Clues Board */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-400" /> Crime Scene Forensic Evidence ({discoveredClueIds.length} / {caseClues.length} Active)
          </h4>
          <span className="text-[10px] font-mono text-cyan-400">Click clue cards to toggle active evidence</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {caseClues.map(clue => {
            const isFound = discoveredClueIds.includes(clue.id);
            return (
              <div 
                key={clue.id}
                onClick={() => handleToggleClue(clue.id)}
                className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  isFound 
                    ? 'border-cyan-400 bg-indigo-950/50 shadow-glow-accent scale-[1.02]' 
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{clue.icon}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isFound ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {isFound ? 'EVIDENCE ACTIVE' : 'INSPECT SITE'}
                  </span>
                </div>
                <h5 className="font-extrabold text-sm text-white">{clue.name}</h5>
                <span className="text-[10px] text-indigo-400 font-mono block mt-0.5">📍 {clue.location}</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{clue.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 Suspect Profiles Grid */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" /> 6 Suspect Profiles & Dynamic Bayesian Guilt Meters
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUSPECTS.map(suspect => {
            const prob = posteriors[suspect.id] || (1 / 6);
            const probPct = (prob * 100).toFixed(1);
            const isHighestProb = Math.max(...Object.values(posteriors)) === prob;

            return (
              <div 
                key={suspect.id}
                className={`glass-card p-5 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                  isHighestProb && discoveredClueIds.length > 0
                    ? 'border-cyan-400 bg-gradient-to-b from-indigo-950/70 to-slate-900 shadow-glow-accent scale-[1.02]' 
                    : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                <div>
                  {/* Suspect Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${suspect.color} flex items-center justify-center text-xl shadow-md`}>
                      {suspect.icon}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-white">{suspect.name}</h5>
                      <span className="text-[11px] text-indigo-400 font-mono">{suspect.alias}</span>
                    </div>
                  </div>

                  {/* Suspect Multi-Trait Matrix */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 mb-4 font-mono">
                    <div><span className="text-slate-500">Hand:</span> <span className="text-white font-bold">{suspect.traits.handedness}</span></div>
                    <div><span className="text-slate-500">Boot:</span> <span className="text-white font-bold">Size {suspect.traits.bootSize}</span></div>
                    <div><span className="text-slate-500">Blood:</span> <span className="text-white font-bold">Type {suspect.traits.bloodType}</span></div>
                    <div><span className="text-slate-500">Height:</span> <span className="text-white font-bold">{suspect.traits.heightCategory}</span></div>
                    <div><span className="text-slate-500">Tattoo:</span> <span className="text-white font-bold">{suspect.traits.tattoo}</span></div>
                    <div><span className="text-slate-500">Tool:</span> <span className="text-white font-bold truncate">{suspect.traits.favoriteTool}</span></div>
                  </div>

                  {/* Live Guilt Probability Meter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="uppercase font-bold text-slate-400 text-[10px]">Guilt Probability</span>
                      <span className="font-mono font-extrabold text-cyan-400 text-sm glow-text-cyan">{probPct}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 shadow-glow-primary"
                        style={{ width: `${probPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Accuse Action Button */}
                <button
                  disabled={isCaseSolved}
                  onClick={() => handleAccuse(suspect.id)}
                  className={`mt-4 w-full py-2 rounded-xl font-bold text-xs transition shadow-md flex items-center justify-center gap-2 ${
                    isCaseSolved
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-glow-primary hover:scale-[1.02]'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Accuse {suspect.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Resolution Banner */}
      {isCaseSolved && (
        <div className={`p-6 rounded-3xl border text-center space-y-3 ${
          accusedId === guiltyId 
            ? 'bg-emerald-950/90 border-emerald-500 shadow-glow-neon' 
            : 'bg-rose-950/90 border-rose-500'
        }`}>
          <div className="inline-flex p-3 rounded-full bg-slate-900 border border-slate-700 text-3xl">
            {accusedId === guiltyId ? '🎉' : '❌'}
          </div>
          <h4 className="text-2xl font-extrabold text-white">
            {accusedId === guiltyId ? 'CASE SOLVED! Guilty Thief Arrested!' : 'WRONG ACCUSATION! The Thief Escaped!'}
          </h4>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            {accusedId === guiltyId 
              ? `Brilliant multi-variable deduction! Bayesian analysis correctly identified ${guiltySuspect?.name} (${guiltySuspect?.alias}) across all 6 forensic clues.`
              : `The actual thief who committed this heist was ${guiltySuspect?.name} (${guiltySuspect?.alias}).`}
          </p>
          <button 
            onClick={handleNewCase}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-glow-primary"
          >
            Play Next 6-Thief Case →
          </button>
        </div>
      )}

      {/* Mathematical Breakdown Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold uppercase text-indigo-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Multi-Variable Bayesian Proof (6 Suspects, 6 Clues)
          </h4>
          <button 
            onClick={() => setShowMathDetails(!showMathDetails)}
            className="text-xs text-cyan-400 font-mono hover:underline"
          >
            {showMathDetails ? 'Hide Proof' : 'Show Proof'}
          </button>
        </div>

        {showMathDetails && (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
              <span className="text-indigo-400 font-bold block mb-1">1. Initial Prior Probability P(T_i):</span>
              With 6 suspects, prior belief starts equally distributed:
              <code className="text-cyan-300 block my-1">P(T_1) = P(T_2) = P(T_3) = P(T_4) = P(T_5) = P(T_6) = 1/6 ≈ 16.67%</code>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
              <span className="text-indigo-400 font-bold block mb-1">2. Multi-Clue Bayes Equation:</span>
              <div className="text-cyan-300 text-sm font-bold py-1">
                P(Thief_i | C_1..C_6) = [ P(T_i) × ∏_{j=1}^{6} P(C_j | Thief_i) ] ÷ ∑_{k=1}^{6} [ P(T_k) × ∏_{j=1}^{6} P(C_j | Thief_k) ]
              </div>
            </div>

            {discoveredClueIds.length > 0 && (
              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 space-y-2">
                <span className="text-emerald-400 font-bold block">3. Live Evaluated Posteriors for Active Evidence:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {SUSPECTS.map(s => (
                    <div key={s.id} className="flex justify-between text-slate-200 bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span>{s.name}</span>
                      <span className="font-bold text-cyan-300">{(posteriors[s.id] * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
