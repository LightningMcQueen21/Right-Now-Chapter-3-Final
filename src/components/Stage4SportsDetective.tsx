import React, { useState } from 'react';
import { Volume2, CheckCircle2, ArrowRight, Sparkles, Search, BookOpen, Quote } from 'lucide-react';
import { DifficultyLevel, LEVEL_THEMES } from '../types/gameTypes';
import { DETECTIVE_SCENES } from '../data/gameData';
import { SportsIllustration } from './SportsIllustration';
import { sound } from '../services/soundEngine';

interface Props {
  difficulty: DifficultyLevel;
  onStageComplete: (score: number, stars: number) => void;
}

export const Stage4SportsDetective: React.FC<Props> = ({ difficulty, onStageComplete }) => {
  const theme = LEVEL_THEMES[difficulty];
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'Yes' | 'No' | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [score, setScore] = useState(0);

  const scene = DETECTIVE_SCENES[currentSceneIdx];

  const handleAnswer = (ans: 'Yes' | 'No') => {
    setSelectedAnswer(ans);
    setShowEvidence(true);

    const isCorrect = ans === scene.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      setScore((s) => s + (difficulty === 'easy' ? 60 : 75));
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextScene = () => {
    sound.playClick();
    if (currentSceneIdx < DETECTIVE_SCENES.length - 1) {
      setCurrentSceneIdx((idx) => idx + 1);
      setSelectedAnswer(null);
      setShowEvidence(false);
    } else {
      sound.playFanfare();
      onStageComplete(score + 100, 3);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 text-white animate-fade-in">
      {/* Stage Header */}
      <div className={`mb-6 p-4 rounded-3xl bg-gradient-to-r ${theme.gradientBg} border-2 ${theme.borderActive} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg`}>
            4
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${theme.textAccent}`}>
                <Search className="w-3.5 h-3.5" /> Stage 4 · {difficulty.toUpperCase()} MODE
              </span>
              <button
                onClick={() =>
                  sound.speakText(
                    `Sports Detective Case File: A Yucky Game of Table Tennis. Scene ${scene.sceneNumber}: ${scene.sceneTitle}. ${scene.question}`
                  )
                }
                className={`p-1 rounded ${theme.textAccent} hover:text-white`}
                title="Listen to scene brief"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Sports Detective: A Yucky Game of Table Tennis
            </h2>
            <p className="text-xs text-slate-300">
              Investigate the sports scenes and verify present continuous facts with Yes/No answers!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Investigation</span>
            <div className={`text-lg font-black ${theme.textAccent}`}>
              Scene {currentSceneIdx + 1} / {DETECTIVE_SCENES.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Detective Investigation Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Scene Card (7 cols) */}
        <div className={`lg:col-span-7 bg-slate-900/95 rounded-3xl border-2 ${theme.border} p-6 shadow-xl flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.textAccent} text-xs font-bold border ${theme.border}`}>
                  Scene {scene.sceneNumber}
                </span>
                <h3 className="font-bold text-base text-white">{scene.sceneTitle}</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Evidence #{scene.sceneNumber}</span>
            </div>

            {/* Illustration */}
            <div className="w-full h-48 sm:h-56 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 mb-4 relative overflow-hidden group">
              <SportsIllustration name={scene.sceneIllustration} className="w-full h-full max-h-48" />
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 text-[10px] text-slate-300 font-mono flex items-center gap-1">
                <Search className={`w-3 h-3 ${theme.textAccent}`} />
                <span>{scene.evidenceType}</span>
              </div>
            </div>

            {/* Narrative Context */}
            <p className="text-sm text-slate-200 leading-relaxed mb-4">
              {scene.storyContext}
            </p>

            {/* Story Dialogue Quote */}
            <div className="p-3 rounded-xl bg-slate-800/80 border-l-4 border-amber-400 text-xs text-amber-200 flex items-start gap-2 mb-4 italic">
              <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{scene.dialogueQuote}</span>
            </div>
          </div>

          {/* Clue Hint */}
          <div className={`p-3 rounded-xl ${theme.secondary} border ${theme.border} text-xs ${theme.textAccent} flex items-center justify-between`}>
            <span><strong>Detective Clue:</strong> {scene.clueHint}</span>
            <button
              onClick={() => sound.speakText(scene.clueHint)}
              className="p-1 rounded text-slate-300 hover:text-white"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Detective Interrogation & Inquiry (5 cols) */}
        <div className={`lg:col-span-5 bg-slate-900/95 rounded-3xl border-2 ${theme.border} p-6 shadow-xl flex flex-col justify-between`}>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Critical Thinking Question
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug">
              {scene.question}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Investigate the clues and determine whether the statement is true or false.
            </p>

            {/* Yes / No Interactive Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                disabled={showEvidence}
                onClick={() => handleAnswer('Yes')}
                className={`py-4 rounded-2xl font-black text-xl transition-all border-2 flex items-center justify-center gap-2 cursor-pointer ${
                  selectedAnswer === 'Yes'
                    ? scene.correctAnswer === 'Yes'
                      ? `${theme.primary} text-slate-950 border-white shadow-lg scale-102`
                      : 'bg-red-500/40 text-red-200 border-red-500'
                    : 'bg-slate-800 hover:bg-slate-750 border-slate-700 hover:border-slate-500 text-white'
                }`}
              >
                <span>YES</span>
              </button>

              <button
                disabled={showEvidence}
                onClick={() => handleAnswer('No')}
                className={`py-4 rounded-2xl font-black text-xl transition-all border-2 flex items-center justify-center gap-2 cursor-pointer ${
                  selectedAnswer === 'No'
                    ? scene.correctAnswer === 'No'
                      ? `${theme.primary} text-slate-950 border-white shadow-lg scale-102`
                      : 'bg-red-500/40 text-red-200 border-red-500'
                    : 'bg-slate-800 hover:bg-slate-750 border-slate-700 hover:border-slate-500 text-white'
                }`}
              >
                <span>NO</span>
              </button>
            </div>

            {/* Evidence Findings Card */}
            {showEvidence && (
              <div
                className={`p-4 rounded-2xl border mb-6 animate-pop-in ${
                  selectedAnswer === scene.correctAnswer
                    ? `${theme.badgeBg} ${theme.borderActive} ${theme.textAccent}`
                    : 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">
                      {selectedAnswer === scene.correctAnswer
                        ? 'Evidence Verified Correctly!'
                        : 'Detective Correction:'}
                    </div>
                    <p className="text-xs md:text-sm mt-1 font-medium leading-relaxed">
                      {scene.followUpSentence}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Final Story Value Card on Scene 4 */}
            {currentSceneIdx === 3 && showEvidence && (
              <div className="p-3.5 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong>Moral Value:</strong> &quot;Don&apos;t make hasty judgements!&quot; (Tom assumed it was a ball without verifying!)
                </span>
              </div>
            )}
          </div>

          {/* Next Button */}
          {showEvidence && (
            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={handleNextScene}
                className={`w-full py-3 rounded-2xl ${theme.primary} hover:opacity-90 text-slate-950 font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95`}
              >
                <span>
                  {currentSceneIdx === DETECTIVE_SCENES.length - 1
                    ? 'Complete Investigation'
                    : 'Next Scene'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
