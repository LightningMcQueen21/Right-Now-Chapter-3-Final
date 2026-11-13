import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, Sparkles, HelpCircle, Lightbulb } from 'lucide-react';
import { DifficultyLevel, ActionItem, LEVEL_THEMES } from '../types/gameTypes';
import { ACTION_ITEMS } from '../data/gameData';
import { SportsIllustration } from './SportsIllustration';
import { sound } from '../services/soundEngine';

interface Props {
  difficulty: DifficultyLevel;
  onStageComplete: (score: number, stars: number) => void;
}

export const Stage2ActionArena: React.FC<Props> = ({ difficulty, onStageComplete }) => {
  const theme = LEVEL_THEMES[difficulty];
  const items: ActionItem[] = ACTION_ITEMS[difficulty];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; msg: string } | null>(null);
  const [score, setScore] = useState(0);

  // Hard mode: Independent Explanation State
  const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);
  const [explanationFeedback, setExplanationFeedback] = useState<string | null>(null);
  const [sentenceBuilt, setSentenceBuilt] = useState(false);

  const currentItem = items[currentIndex];

  // Scrambled pool for hard mode
  const [scrambledPool, setScrambledPool] = useState<string[]>(() => {
    return currentItem.scrambledWords ? [...currentItem.scrambledWords].sort(() => Math.random() - 0.5) : [];
  });

  const loadQuestion = (nextIndex: number) => {
    setCurrentIndex(nextIndex);
    setSelectedWord(null);
    setFeedback(null);
    setSentenceBuilt(false);
    setSelectedExplanation(null);
    setExplanationFeedback(null);
    const item = items[nextIndex];
    if (item.scrambledWords) {
      setScrambledPool([...item.scrambledWords].sort(() => Math.random() - 0.5));
      setArrangedWords([]);
    }
  };

  // Easy & Medium: Word selection
  const handleOptionSelect = (word: string) => {
    sound.playClick();
    setSelectedWord(word);

    const isCorrect = word === currentItem.missingWord;
    if (isCorrect) {
      sound.playCorrect();
      setScore((s) => s + (difficulty === 'easy' ? 40 : 50));

      if (difficulty === 'easy') {
        // Easy: Explanation NOT required
        setFeedback({
          isCorrect: true,
          msg: `Super! "${currentItem.fullSentence}" is correct!`
        });
      } else {
        // Medium: Short answer explanation
        setFeedback({
          isCorrect: true,
          msg: `Correct! "${currentItem.fullSentence}" (Short Answer: We use is/are + verb-ing for continuous actions.)`
        });
      }
    } else {
      sound.playIncorrect();
      setFeedback({
        isCorrect: false,
        msg: difficulty === 'easy'
          ? `Try again! Hint: ${currentItem.hint}`
          : `Review subject-verb agreement and the continuous -ing ending.`
      });
    }
  };

  // Hard mode: tile click to build sentence independently
  const handleWordTileClick = (word: string, poolIndex: number) => {
    sound.playBallBounce();
    const newPool = [...scrambledPool];
    newPool.splice(poolIndex, 1);
    setScrambledPool(newPool);

    const newArranged = [...arrangedWords, word];
    setArrangedWords(newArranged);

    // If all tiles placed, check match
    if (newPool.length === 0 && currentItem.scrambledWords) {
      const constructed = newArranged.join(' ');
      const expected = currentItem.scrambledWords.join(' ');
      if (constructed.toLowerCase() === expected.toLowerCase()) {
        sound.playCorrect();
        setSentenceBuilt(true);
        setScore((s) => s + 60);
        setFeedback({
          isCorrect: true,
          msg: `Sentence completed independently! Now explain your grammatical choice below:`
        });
      } else {
        sound.playIncorrect();
        setFeedback({
          isCorrect: false,
          msg: `Word order is incorrect. Tap a placed word to remove it and try again.`
        });
      }
    }
  };

  const handleRemoveArrangedWord = (word: string, arrangedIndex: number) => {
    sound.playClick();
    const newArranged = [...arrangedWords];
    newArranged.splice(arrangedIndex, 1);
    setArrangedWords(newArranged);
    setScrambledPool([...scrambledPool, word]);
    setSentenceBuilt(false);
    setFeedback(null);
  };

  // Hard mode: Independent Explanation Selection
  const handleExplanationSelect = (exp: string) => {
    sound.playClick();
    setSelectedExplanation(exp);
    const isRight = exp === currentItem.correctExplanation;
    if (isRight) {
      sound.playCorrect();
      setScore((s) => s + 30);
      setExplanationFeedback('Excellent independent explanation! Full mastery points awarded.');
    } else {
      sound.playIncorrect();
      setExplanationFeedback(`Incorrect reasoning. Remember: ${currentItem.correctExplanation}`);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < items.length - 1) {
      loadQuestion(currentIndex + 1);
    } else {
      sound.playFanfare();
      onStageComplete(score + 100, 3);
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    loadQuestion(currentIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 text-white animate-fade-in">
      {/* Header Banner */}
      <div className={`mb-6 p-4 rounded-3xl bg-gradient-to-r ${theme.gradientBg} border-2 ${theme.borderActive} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg`}>
            2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent}`}>
                Stage 2 · {difficulty.toUpperCase()} MODE ({items.length} Actions)
              </span>
              <button
                onClick={() =>
                  sound.speakText(
                    `Action Arena: Look at the sports picture. Identify the action and complete the sentence.`
                  )
                }
                className={`p-1 rounded ${theme.textAccent} hover:text-white`}
                title="Listen to instruction"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Picture Recognition &amp; Sentence Building
            </h2>
            <p className="text-xs text-slate-300">
              {difficulty === 'easy' && 'Guided Mode (3 Actions) · Word banks provided · No explanation required'}
              {difficulty === 'medium' && 'Semi-Guided Mode (5 Actions) · Missing verb inflections · Short answers'}
              {difficulty === 'hard' && 'Independent Mode (6 Actions) · Full sentence construction · Explain independently'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Progress</span>
            <div className={`text-lg font-black ${theme.textAccent}`}>
              {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className={`bg-slate-900/95 rounded-3xl border-2 ${theme.border} p-6 md:p-8 shadow-xl`}>
        {/* Visual Clue & Sentence Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className={`flex flex-col items-center justify-center p-6 rounded-2xl ${theme.secondary} border ${theme.border} text-center`}>
            <div className="w-32 h-32 flex items-center justify-center mb-3">
              <SportsIllustration name={currentItem.iconName} className="w-32 h-32" />
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent}`}>
              Target Action: {currentItem.action}
            </span>
            <p className="text-xs text-slate-300 mt-1">{currentItem.hint}</p>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-2xl bg-slate-950 border ${theme.border}`}>
              <div className={`text-[11px] font-bold uppercase tracking-wider ${theme.textAccent} mb-1 flex items-center gap-1.5`}>
                <HelpCircle className="w-4 h-4" /> Sentence Structure
              </div>
              <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>
                  {difficulty === 'hard'
                    ? 'Build the full sentence using the word tiles:'
                    : currentItem.fullSentence.replace(
                        currentItem.missingWord || '',
                        '____________'
                      )}
                </span>
                <button
                  onClick={() => sound.speakText(currentItem.fullSentence)}
                  className={`p-1 rounded ${theme.textAccent} hover:text-white`}
                  title="Listen to full sentence"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scaffolding Tip based on Level */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                {difficulty === 'easy' && 'Choose the sports action word that ends in "-ing" to complete the sentence!'}
                {difficulty === 'medium' && 'Ensure the verb matches whether one person ("is") or more ("are") are playing.'}
                {difficulty === 'hard' && 'Independent task: Assemble tiles and explain the grammar rule.'}
              </span>
            </div>
          </div>
        </div>

        {/* Easy & Medium Interaction (Guided / Semi-guided choices) */}
        {difficulty !== 'hard' ? (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {difficulty === 'easy' ? 'Select from the word bank:' : 'Choose the correct verb form:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {currentItem.options?.map((opt) => {
                const isSelected = selectedWord === opt;
                const isRight = opt === currentItem.missingWord;

                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    className={`p-4 rounded-2xl font-bold text-base transition-all border-2 text-center flex items-center justify-center gap-2 ${
                      isSelected && isRight
                        ? `${theme.primary} text-slate-950 border-white shadow-lg scale-102`
                        : isSelected && !isRight
                        ? 'bg-red-500/30 text-red-200 border-red-500'
                        : 'bg-slate-800 hover:bg-slate-750 text-white border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span>{opt}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.speakText(opt);
                      }}
                      className="p-1 rounded text-slate-300 hover:text-white"
                      title={`Listen to ${opt}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Hard Mode: Independent Word Tile Assembly */
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Independent Sentence Assembly (Tap word to remove):
              </span>
              <button
                onClick={handleResetCurrent}
                className="text-xs text-amber-300 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Tiles
              </button>
            </div>

            {/* Assembly Target Box */}
            <div className={`min-h-16 p-4 rounded-2xl bg-slate-950 border-2 border-dashed ${theme.borderActive} flex flex-wrap items-center gap-2`}>
              {arrangedWords.length === 0 ? (
                <span className="text-xs text-slate-500 italic">
                  Tap word tiles below to construct the complete sentence...
                </span>
              ) : (
                arrangedWords.map((w, idx) => (
                  <button
                    key={`${w}-${idx}`}
                    onClick={() => handleRemoveArrangedWord(w, idx)}
                    className={`px-3.5 py-1.5 rounded-xl ${theme.primary} hover:bg-red-600 text-white font-bold text-sm shadow transition-all`}
                  >
                    {w} &times;
                  </button>
                ))
              )}
            </div>

            {/* Tile Pool */}
            <div className="flex flex-wrap gap-2">
              {scrambledPool.map((w, idx) => (
                <button
                  key={`${w}-${idx}`}
                  onClick={() => handleWordTileClick(w, idx)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-purple-500 hover:text-white text-white font-bold text-sm border border-slate-700 transition-all shadow active:scale-95"
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Hard Mode Independent Explanation Challenge */}
            {sentenceBuilt && currentItem.explanationPrompt && (
              <div className="mt-6 p-4 rounded-2xl bg-purple-950/50 border border-purple-500/50 animate-pop-in">
                <div className="flex items-center gap-2 mb-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  Independent Explanation Requirement:
                </div>
                <p className="text-sm font-bold text-white mb-3">
                  {currentItem.explanationPrompt}
                </p>
                <div className="space-y-2">
                  {currentItem.explanationOptions?.map((exp) => {
                    const isSelected = selectedExplanation === exp;
                    const isCorrect = exp === currentItem.correctExplanation;
                    return (
                      <button
                        key={exp}
                        onClick={() => handleExplanationSelect(exp)}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? isCorrect
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
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-sm font-bold flex items-center justify-between gap-3 mb-6 ${
              feedback.isCorrect
                ? `${theme.badgeBg} border ${theme.borderActive} ${theme.textAccent}`
                : 'bg-red-500/20 border border-red-500/40 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              <span>{feedback.msg}</span>
            </div>
            {feedback.isCorrect && (difficulty !== 'hard' || selectedExplanation) && (
              <button
                onClick={handleNext}
                className={`px-5 py-2 rounded-xl ${theme.primary} hover:opacity-90 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handleResetCurrent}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset Current Question
          </button>

          {feedback?.isCorrect && (difficulty !== 'hard' || selectedExplanation) && (
            <button
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-xl ${theme.primary} hover:opacity-90 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg`}
            >
              <span>{currentIndex === items.length - 1 ? 'Finish Stage 2' : 'Next Action'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
