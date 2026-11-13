import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, Sparkles, Lightbulb } from 'lucide-react';
import { DifficultyLevel, GrammarQuestion, LEVEL_THEMES } from '../types/gameTypes';
import { GRAMMAR_QUESTIONS } from '../data/gameData';
import { sound } from '../services/soundEngine';

interface Props {
  difficulty: DifficultyLevel;
  onStageComplete: (score: number, stars: number) => void;
}

export const Stage3GrammarShowdown: React.FC<Props> = ({ difficulty, onStageComplete }) => {
  const theme = LEVEL_THEMES[difficulty];
  const questions: GrammarQuestion[] = GRAMMAR_QUESTIONS[difficulty];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Hard mode: independent explanation selection
  const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);
  const [explanationFeedback, setExplanationFeedback] = useState<string | null>(null);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      setScore((s) => s + (difficulty === 'easy' ? 50 : 60) + streak * 10);
      setStreak((st) => st + 1);
    } else {
      sound.playIncorrect();
      setStreak(0);
    }
  };

  const handleExplanationSelect = (exp: string) => {
    sound.playClick();
    setSelectedExplanation(exp);
    const isRight = exp === currentQ.correctExplanation;
    if (isRight) {
      sound.playCorrect();
      setScore((s) => s + 35);
      setExplanationFeedback('Brilliant independent grammatical reasoning!');
    } else {
      sound.playIncorrect();
      setExplanationFeedback(`Review: ${currentQ.correctExplanation}`);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setSelectedExplanation(null);
      setExplanationFeedback(null);
    } else {
      sound.playFanfare();
      onStageComplete(score + 100, 3);
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 text-white animate-fade-in">
      {/* Header Banner */}
      <div className={`mb-6 p-4 rounded-3xl bg-gradient-to-r ${theme.gradientBg} border-2 ${theme.borderActive} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg`}>
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent}`}>
                Stage 3 · {difficulty.toUpperCase()} MODE ({questions.length} Questions)
              </span>
              <button
                onClick={() =>
                  sound.speakText(
                    `Grammar Showdown. Question ${currentIndex + 1}. ${currentQ.prompt}. ${currentQ.sentenceWithBlank.replace('___', 'blank')}`
                  )
                }
                className={`p-1 rounded ${theme.textAccent} hover:text-white`}
                title="Listen to question"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Grammar Showdown
            </h2>
            <p className="text-xs text-slate-300">
              {difficulty === 'easy' && 'Basic Grammar · "am / is / are" & negative sentences · No explanation required'}
              {difficulty === 'medium' && 'Intermediate Grammar · isn\'t / aren\'t · Short answer explanations'}
              {difficulty === 'hard' && 'Advanced Grammar · Error spotting & rules · Explain answers independently'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <div className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{streak}x Streak!</span>
            </div>
          )}
          <div className="text-right">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Question</span>
            <div className={`text-lg font-black ${theme.textAccent}`}>
              {currentIndex + 1} / {questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Stadium Card */}
      <div className={`bg-slate-900/95 rounded-3xl border-2 ${theme.border} p-6 md:p-8 shadow-2xl relative overflow-hidden`}>
        {/* Prompt */}
        <div className="mb-4">
          <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent}`}>
            {currentQ.prompt}
          </span>
        </div>

        {/* Big Sentence Display */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            {currentQ.sentenceWithBlank.split('___').map((part, i, arr) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < arr.length - 1 && (
                  <span
                    className={`inline-block px-3 py-1 mx-1.5 rounded-xl border-2 font-mono font-black ${
                      selectedAnswer
                        ? selectedAnswer === currentQ.correctAnswer
                          ? `${theme.primary} text-slate-950 border-white animate-pop-in`
                          : 'bg-red-500/40 text-red-200 border-red-500'
                        : `${theme.badgeBg} ${theme.textAccent} ${theme.border} border-dashed animate-pulse`
                    }`}
                  >
                    {selectedAnswer || ' ? '}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() =>
              sound.speakText(
                selectedAnswer
                  ? currentQ.sentenceWithBlank.replace('___', selectedAnswer)
                  : currentQ.sentenceWithBlank.replace('___', 'blank')
              )
            }
            className={`p-2.5 rounded-xl ${theme.badgeBg} hover:opacity-80 ${theme.textAccent} border ${theme.border} transition-colors shrink-0`}
            title="Read sentence aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Rule Hint Box */}
        <div className={`mb-6 p-3.5 rounded-xl ${theme.secondary} border ${theme.border} text-xs ${theme.textAccent} flex items-center gap-2`}>
          <Lightbulb className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            <strong className="text-amber-300">Target Rule:</strong> {currentQ.ruleHint}
          </span>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {currentQ.options.map((option, idx) => {
            const letter = optionLetters[idx] || '';
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQ.correctAnswer;

            let btnStyle = 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-white';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = `${theme.primary} text-slate-950 border-white shadow-lg font-black`;
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-red-500/30 border-red-500 text-red-200';
              } else {
                btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center font-bold text-sm shrink-0">
                    {letter}
                  </span>
                  <span className="text-lg font-bold">{option}</span>
                </div>

                {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-slate-950" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
              </button>
            );
          })}
        </div>

        {/* Mode-Specific Explanation:
            - Easy: Not required (none shown)
            - Medium: Short answers
            - Hard: Explain independently */}
        {isAnswered && difficulty === 'medium' && currentQ.shortExplanation && (
          <div className="p-4 rounded-2xl mb-6 bg-amber-500/15 border border-amber-500/40 text-amber-200 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-amber-300" />
              <div>
                <p className="font-bold text-sm">Short Explanation:</p>
                <p className="text-xs md:text-sm mt-0.5 leading-relaxed">{currentQ.shortExplanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hard Mode Independent Explanation Challenge */}
        {isAnswered && difficulty === 'hard' && currentQ.explanationPrompt && (
          <div className="p-4 rounded-2xl mb-6 bg-purple-950/60 border border-purple-500/50 animate-pop-in">
            <div className="flex items-center gap-2 mb-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-300" />
              Explain Independently (Select the correct reasoning):
            </div>
            <p className="text-sm font-bold text-white mb-3">{currentQ.explanationPrompt}</p>
            <div className="space-y-2">
              {currentQ.explanationOptions?.map((exp) => {
                const isSelected = selectedExplanation === exp;
                const isRight = exp === currentQ.correctExplanation;
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
            {explanationFeedback && (
              <p className="text-xs font-bold text-purple-200 mt-2">
                {explanationFeedback}
              </p>
            )}
          </div>
        )}

        {/* Next Question Control */}
        {isAnswered && (difficulty !== 'hard' || selectedExplanation) && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className={`px-8 py-3 rounded-2xl ${theme.primary} hover:opacity-90 text-slate-950 font-black text-sm md:text-base flex items-center gap-2 shadow-lg transition-transform active:scale-95`}
            >
              <span>{currentIndex === questions.length - 1 ? 'Finish Stage 3' : 'Next Question'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
