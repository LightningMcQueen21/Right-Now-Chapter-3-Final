import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Trophy, AlertTriangle, HelpCircle } from 'lucide-react';
import { DifficultyLevel, GrandChallengeItem, LEVEL_THEMES } from '../types/gameTypes';
import { GRAND_CHALLENGES } from '../data/gameData';
import { SportsIllustration } from './SportsIllustration';
import { sound } from '../services/soundEngine';

interface Props {
  difficulty: DifficultyLevel;
  onStageComplete: (score: number, stars: number) => void;
}

export const Stage5GrandChallenge: React.FC<Props> = ({ difficulty, onStageComplete }) => {
  const theme = LEVEL_THEMES[difficulty];
  const challenges: GrandChallengeItem[] = GRAND_CHALLENGES[difficulty];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [poolWords, setPoolWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);

  const challenge = challenges[currentIndex];

  React.useEffect(() => {
    if (challenge.wordsToOrder) {
      setPoolWords([...challenge.wordsToOrder].sort(() => Math.random() - 0.5));
      setArrangedWords([]);
    }
  }, [currentIndex, challenge]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const correct = opt === challenge.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setScore((s) => s + (difficulty === 'easy' ? 60 : 80));
    } else {
      sound.playIncorrect();
    }
  };

  const handleWordTileClick = (word: string, poolIdx: number) => {
    if (isAnswered) return;
    sound.playBallBounce();
    const newPool = [...poolWords];
    newPool.splice(poolIdx, 1);
    setPoolWords(newPool);

    const newArranged = [...arrangedWords, word];
    setArrangedWords(newArranged);

    if (newPool.length === 0 && Array.isArray(challenge.correctAnswer)) {
      const isMatch = newArranged.every((w, i) => w === (challenge.correctAnswer as string[])[i]);
      setIsAnswered(true);
      setIsCorrect(isMatch);
      if (isMatch) {
        sound.playCorrect();
        setScore((s) => s + 90);
      } else {
        sound.playIncorrect();
      }
    }
  };

  const handleRemoveArrangedWord = (word: string, arrangedIdx: number) => {
    if (isAnswered) return;
    sound.playClick();
    const newArranged = [...arrangedWords];
    newArranged.splice(arrangedIdx, 1);
    setArrangedWords(newArranged);
    setPoolWords([...poolWords, word]);
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedExplanation(null);
    if (challenge.wordsToOrder) {
      setPoolWords([...challenge.wordsToOrder].sort(() => Math.random() - 0.5));
      setArrangedWords([]);
    }
  };

  const handleExplanationSelect = (exp: string) => {
    sound.playClick();
    setSelectedExplanation(exp);
    if (exp === challenge.correctExplanation) {
      sound.playCorrect();
      setScore((s) => s + 40);
    } else {
      sound.playIncorrect();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedExplanation(null);
    } else {
      sound.playFanfare();
      onStageComplete(score + 150, 3);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 text-white animate-fade-in">
      {/* Header Banner */}
      <div className={`mb-6 p-4 rounded-3xl bg-gradient-to-r ${theme.gradientBg} border-2 ${theme.borderActive} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg`}>
            5
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${theme.textAccent}`}>
                <Trophy className="w-3.5 h-3.5" /> Stage 5 · {difficulty.toUpperCase()} MODE ({challenges.length} Rounds)
              </span>
              <button
                onClick={() =>
                  sound.speakText(
                    `The Grand Sports Challenge. ${challenge.title}. ${challenge.instruction}. ${challenge.contextText}`
                  )
                }
                className={`p-1 rounded ${theme.textAccent} hover:text-white`}
                title="Listen to instruction"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              The Grand Sports Challenge
            </h2>
            <p className="text-xs text-slate-300">
              Combine everything learned to claim the Championship Trophy!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Round</span>
            <div className={`text-lg font-black ${theme.textAccent}`}>
              {currentIndex + 1} / {challenges.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Challenge Board */}
      <div className={`bg-slate-900/95 rounded-3xl border-2 ${theme.border} p-6 md:p-8 shadow-2xl relative`}>
        {/* Challenge Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full ${theme.badgeBg} ${theme.textAccent} text-xs font-bold border ${theme.border} flex items-center gap-1.5`}>
              {challenge.type === 'fix_error' ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  Referee Error Spotter
                </>
              ) : challenge.type === 'form_question' ? (
                <>
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  Question Formulator
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Grand Action Challenge
                </>
              )}
            </span>
            <span className="text-sm font-bold text-white">{challenge.title}</span>
          </div>

          <button
            onClick={handleResetCurrent}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Round
          </button>
        </div>

        {/* Instruction Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex flex-col md:flex-row items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
            <SportsIllustration name={challenge.visualCue} className="w-16 h-16" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {challenge.instruction}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 italic">
              &quot;{challenge.contextText}&quot;
            </p>
          </div>

          <button
            onClick={() => sound.speakText(`${challenge.instruction}. ${challenge.contextText}`)}
            className={`p-2 rounded-xl ${theme.badgeBg} ${theme.textAccent} hover:opacity-80 shrink-0`}
            title="Read instruction aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Interaction: Options or Word Tile Ordering */}
        {challenge.type === 'form_question' && challenge.wordsToOrder ? (
          <div className="space-y-4 mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Form Question with Is / Are (Tap tiles into order):
            </div>

            <div className={`min-h-16 p-4 rounded-2xl bg-slate-950 border-2 border-dashed ${theme.borderActive} flex flex-wrap items-center gap-2`}>
              {arrangedWords.length === 0 ? (
                <span className="text-xs text-slate-500 italic">
                  Tap word tiles below to form your question...
                </span>
              ) : (
                arrangedWords.map((w, idx) => (
                  <button
                    key={`${w}-${idx}`}
                    onClick={() => handleRemoveArrangedWord(w, idx)}
                    className={`px-3.5 py-1.5 rounded-xl ${theme.primary} hover:bg-red-600 text-slate-950 hover:text-white font-bold text-sm shadow transition-all`}
                  >
                    {w} &times;
                  </button>
                ))
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {poolWords.map((w, idx) => (
                <button
                  key={`${w}-${idx}`}
                  onClick={() => handleWordTileClick(w, idx)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-sm border border-slate-700 transition-all shadow active:scale-95"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 mb-6">
            {challenge.options?.map((opt) => {
              const isSelected = selectedOption === opt;
              const isAnswerCorrect = opt === challenge.correctAnswer;

              let style = 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-white';
              if (isAnswered) {
                if (isAnswerCorrect) {
                  style = `${theme.primary} text-slate-950 border-white font-black shadow-lg`;
                } else if (isSelected && !isAnswerCorrect) {
                  style = 'bg-red-500/30 border-red-500 text-red-200';
                } else {
                  style = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span className="text-base sm:text-lg font-bold">{opt}</span>
                  {isAnswered && isAnswerCorrect && <CheckCircle2 className="w-6 h-6 text-slate-950" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Hard Mode Independent Explanation in Stage 5 */}
        {isAnswered && difficulty === 'hard' && challenge.explanationOptions && (
          <div className="p-4 rounded-2xl mb-6 bg-purple-950/60 border border-purple-500/50 animate-pop-in">
            <div className="flex items-center gap-2 mb-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-300" />
              Independent Linguistic Explanation:
            </div>
            <p className="text-sm font-bold text-white mb-3">
              Why is this grammatical choice correct?
            </p>
            <div className="space-y-2">
              {challenge.explanationOptions.map((exp) => {
                const isSelected = selectedExplanation === exp;
                const isRight = exp === challenge.correctExplanation;
                return (
                  <button
                    key={exp}
                    onClick={() => handleExplanationSelect(exp)}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? isRight
                          ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-bold'
                          : 'bg-red-500/30 text-red-200 border-red-500'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                    }`}
                  >
                    {exp}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pedagogical Feedback (Short answers on Medium, celebratory on Easy) */}
        {isAnswered && difficulty !== 'easy' && (
          <div
            className={`p-4 rounded-2xl mb-6 border animate-fade-in ${
              isCorrect
                ? `${theme.badgeBg} ${theme.borderActive} ${theme.textAccent}`
                : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-amber-300" />
              <div>
                <p className="font-bold text-sm">
                  {isCorrect ? 'Championship Precision!' : 'Referee Correction:'}
                </p>
                <p className="text-xs md:text-sm mt-0.5 leading-relaxed">{challenge.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next / Finish Button */}
        {isAnswered && (difficulty !== 'hard' || !challenge.explanationOptions || selectedExplanation) && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className={`px-8 py-3 rounded-2xl ${theme.primary} hover:opacity-90 text-slate-950 font-black text-sm md:text-base flex items-center gap-2 shadow-xl transition-transform active:scale-95`}
            >
              <span>
                {currentIndex === challenges.length - 1
                  ? 'Complete Grand Challenge!'
                  : 'Next Round'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
