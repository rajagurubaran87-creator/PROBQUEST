import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Play, CheckCircle2, Award, HelpCircle, Sparkles } from 'lucide-react';
import TreasureChestOdds from './minigames/TreasureChestOdds';
import DetectiveBoard from './minigames/DetectiveBoard';
import TwoDiceDuel from './minigames/TwoDiceDuel';
import MedicalLab from './minigames/MedicalLab';
import LootTableBuilder from './minigames/LootTableBuilder';
import FairGameSlot from './minigames/FairGameSlot';
import ArcheryTrials from './minigames/ArcheryTrials';
import CallCenterRush from './minigames/CallCenterRush';
import FirstStrike from './minigames/FirstStrike';
import RiverExplorer from './minigames/RiverExplorer';
import BalanceBeam from './minigames/BalanceBeam';
import SpinnerWheel from './minigames/SpinnerWheel';
import WaitingRoom from './minigames/WaitingRoom';
import BellCurveArchery from './minigames/BellCurveArchery';

export default function MiniGameContainer({ zone, onBack, onCompleteZone }) {
  const [activeSubTab, setActiveSubTab] = useState('explainer'); // 'explainer' | 'sim' | 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Map zone.id to mini-game component
  const renderMiniGame = () => {
    switch (zone.id) {
      case 'z1': return <TreasureChestOdds params={zone.defaultParams} />;
      case 'z2': return <DetectiveBoard />;
      case 'z3': return <TwoDiceDuel />;
      case 'z4': return <MedicalLab />;
      case 'z5': return <LootTableBuilder />;
      case 'z6': return <FairGameSlot />;
      case 'z7': return <ArcheryTrials />;
      case 'z8': return <CallCenterRush />;
      case 'z9': return <FirstStrike />;
      case 'z10': return <RiverExplorer />;
      case 'z11': return <BalanceBeam />;
      case 'z12': return <SpinnerWheel />;
      case 'z13': return <WaitingRoom />;
      case 'z14': return <BellCurveArchery />;
      default: return <TreasureChestOdds />;
    }
  };

  const handleSelectQuizOption = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    zone.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (onCompleteZone) {
      onCompleteZone(zone.id, score, zone.quiz.length);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Island Map
        </button>

        <div className="text-center sm:text-left">
          <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono tracking-wider">
            {zone.unitTitle}
          </span>
          <h2 className="text-2xl font-extrabold text-white">{zone.title}</h2>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('explainer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'explainer' ? 'bg-indigo-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Concept Guide
          </button>
          <button
            onClick={() => setActiveSubTab('sim')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'sim' ? 'bg-indigo-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" /> Interactive Sandbox
          </button>
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSubTab === 'quiz' ? 'bg-indigo-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Adaptive Quiz ({zone.quiz.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CONCEPT EXPLAINER */}
      {activeSubTab === 'explainer' && (
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-white">{zone.explainer.headline}</h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{zone.explainer.body}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs uppercase font-bold text-indigo-400 block mb-1">Mathematical Formula</span>
            <div className="text-lg font-mono text-cyan-300 font-bold tracking-wide">
              {zone.formula}
            </div>
          </div>

          <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/20 text-xs text-indigo-200">
            <span className="font-bold text-indigo-300 block mb-1">Real-World Intuition:</span>
            {zone.explainer.example}
          </div>

          <div className="text-right">
            <button 
              onClick={() => setActiveSubTab('sim')}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-glow-primary transition hover:scale-105"
            >
              Proceed to Interactive Sandbox →
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INTERACTIVE MINI-GAME SANDBOX */}
      {activeSubTab === 'sim' && (
        <div className="space-y-6">
          {renderMiniGame()}

          <div className="text-right">
            <button 
              onClick={() => setActiveSubTab('quiz')}
              className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-glow-neon transition hover:scale-105"
            >
              Take Zone Mastery Quiz →
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ADAPTIVE QUIZ */}
      {activeSubTab === 'quiz' && (
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <h3 className="text-lg font-extrabold text-white">Zone Quiz — Test Your Knowledge</h3>
            <span className="text-xs font-mono text-indigo-400 font-semibold">{zone.quiz.length} Questions</span>
          </div>

          <div className="space-y-6">
            {zone.quiz.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              return (
                <div key={qIdx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-semibold text-slate-200">
                    Q{qIdx + 1}. {q.question}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-indigo-500';

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                          className={`p-3 rounded-lg border text-xs text-left transition ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-2 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                      <span className="font-bold text-indigo-400 block">Explanation:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button 
              onClick={handleSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < zone.quiz.length}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-glow-primary disabled:opacity-50 transition"
            >
              Submit Quiz & Calculate Score
            </button>
          ) : (
            <div className="bg-emerald-950/60 p-6 rounded-2xl border border-emerald-500/40 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Quiz Complete!</h4>
              <p className="text-sm text-emerald-300 font-mono">
                You scored {quizScore} out of {zone.quiz.length} ({(quizScore / zone.quiz.length * 100).toFixed(0)}%)
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button onClick={onBack} className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-xl">
                  Return to Island Map
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
