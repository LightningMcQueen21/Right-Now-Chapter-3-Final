import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { DifficultyLevel, EquipmentItem, LEVEL_THEMES } from '../types/gameTypes';
import { EQUIPMENT_ITEMS } from '../data/gameData';
import { SportsIllustration } from './SportsIllustration';
import { sound } from '../services/soundEngine';

interface Props {
  difficulty: DifficultyLevel;
  onStageComplete: (score: number, stars: number) => void;
}

export const Stage1EquipmentMatch: React.FC<Props> = ({ difficulty, onStageComplete }) => {
  const theme = LEVEL_THEMES[difficulty];
  const items: EquipmentItem[] = EQUIPMENT_ITEMS[difficulty];

  // Matched pairs: map of equipmentId -> sportName
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);

  // Scrambled sports target list for matching
  const [sportOptions] = useState<string[]>(() => {
    return [...items.map((i) => i.sport)].sort(() => Math.random() - 0.5);
  });

  const handlePairSelection = (equipmentId: string, sportName: string) => {
    const item = items.find((i) => i.id === equipmentId);
    if (!item) return;

    if (item.sport === sportName) {
      sound.playCorrect();
      const newMatches = { ...matches, [equipmentId]: sportName };
      setMatches(newMatches);

      // Tailored feedback depending on difficulty
      if (difficulty === 'easy') {
        setFeedbackMsg(`Great job! ${item.name} is for ${sportName}!`);
      } else if (difficulty === 'medium') {
        setFeedbackMsg(`Correct! ${item.name} pairs with ${sportName}.`);
      } else {
        setFeedbackMsg(`Precise match! The ${item.name} is standard regulation gear for ${sportName}.`);
      }

      setSelectedEquipment(null);
      setSelectedSport(null);
      setWrongAttempt(null);

      // Check if all matched
      if (Object.keys(newMatches).length === items.length) {
        sound.playFanfare();
        setTimeout(() => {
          onStageComplete(250 + items.length * 30, 3);
        }, 1200);
      }
    } else {
      sound.playIncorrect();
      setWrongAttempt(equipmentId);

      if (difficulty === 'easy') {
        setFeedbackMsg(`Oops! ${item.name} is not for ${sportName}. Try again! ${item.hint}`);
      } else if (difficulty === 'medium') {
        setFeedbackMsg(`Not quite! A ${item.name} is not used for ${sportName}. Think about the equipment.`);
      } else {
        setFeedbackMsg(`Incorrect pairing. Review the functional characteristics of ${item.name}.`);
      }

      setTimeout(() => {
        setSelectedEquipment(null);
        setSelectedSport(null);
        setWrongAttempt(null);
      }, 1000);
    }
  };

  const onEquipmentClick = (id: string) => {
    sound.playClick();
    if (matches[id]) return;

    if (selectedSport) {
      handlePairSelection(id, selectedSport);
    } else {
      setSelectedEquipment(id);
    }
  };

  const onSportClick = (sport: string) => {
    sound.playClick();
    if (Object.values(matches).includes(sport)) return;

    if (selectedEquipment) {
      handlePairSelection(selectedEquipment, sport);
    } else {
      setSelectedSport(sport);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    sound.playBallBounce();
  };

  const handleDrop = (e: React.DragEvent, sport: string) => {
    e.preventDefault();
    const equipmentId = e.dataTransfer.getData('text/plain');
    if (equipmentId) {
      handlePairSelection(equipmentId, sport);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleReset = () => {
    sound.playClick();
    setMatches({});
    setSelectedEquipment(null);
    setSelectedSport(null);
    setFeedbackMsg(null);
  };

  const matchedCount = Object.keys(matches).length;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 text-white animate-fade-in">
      {/* Banner Styled according to Difficulty Theme */}
      <div className={`mb-6 p-4 rounded-3xl bg-gradient-to-r ${theme.gradientBg} border-2 ${theme.borderActive} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${theme.primary} text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg`}>
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent}`}>
                Stage 1 · {difficulty.toUpperCase()} MODE ({items.length} Actions)
              </span>
              <button
                onClick={() =>
                  sound.speakText(
                    `Stage 1: Sports Equipment Match. Match each piece of sports gear with the correct sport name.`
                  )
                }
                className={`p-1 rounded ${theme.textAccent} hover:text-white`}
                title="Listen to instruction"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Sports Equipment Match
            </h2>
            <p className="text-xs text-slate-300">
              {difficulty === 'easy' && 'Drag or tap each picture to pair with its sport! (3 Actions · Guided Hints)'}
              {difficulty === 'medium' && 'Match sports equipment with corresponding activities. (5 Actions)'}
              {difficulty === 'hard' && 'Advanced sports gear and athletics synthesis. (6 Actions)'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Matched:</span>
            <div className={`text-lg font-black ${theme.textAccent}`}>
              {matchedCount} / {items.length}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Reset Matching Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`mb-6 p-3 rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            wrongAttempt
              ? 'bg-red-500/20 border border-red-500/40 text-red-300 animate-shake'
              : `${theme.badgeBg} border ${theme.borderActive} ${theme.textAccent} animate-bounce-short`
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Matching Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Equipment items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme.textAccent} flex items-center gap-1.5`}>
              <HelpCircle className="w-4 h-4" />
              1. Choose Sports Equipment ({items.length} items)
            </span>
            <span className="text-[11px] text-slate-400">Click or Drag</span>
          </div>

          <div className={`grid grid-cols-1 ${items.length > 3 ? 'sm:grid-cols-2' : 'sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3'} gap-3`}>
            {items.map((item) => {
              const isMatched = !!matches[item.id];
              const isSelected = selectedEquipment === item.id;
              const isWrong = wrongAttempt === item.id;

              return (
                <div
                  key={item.id}
                  draggable={!isMatched}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => onEquipmentClick(item.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col items-center justify-center text-center ${
                    isMatched
                      ? `${theme.secondary} ${theme.border} opacity-50 cursor-default`
                      : isSelected
                      ? `${theme.badgeBg} ${theme.borderActive} shadow-lg scale-102 ring-2 ring-white/30`
                      : isWrong
                      ? 'bg-red-950/60 border-red-500 animate-shake'
                      : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-600 shadow-md'
                  }`}
                >
                  {isMatched && (
                    <div className={`absolute top-2 right-2 p-1 rounded-full ${theme.primary} text-slate-950`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}

                  <div className="w-20 h-20 mb-2 flex items-center justify-center">
                    <SportsIllustration name={item.iconName} className="w-20 h-20" />
                  </div>

                  <div className="font-bold text-sm text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{item.description}</div>

                  {difficulty === 'easy' && (
                    <div className="text-[10px] text-emerald-400/90 mt-1 italic">
                      Clue: {item.hint}
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.speakText(item.name);
                    }}
                    className="mt-2 p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                    title={`Listen to ${item.name}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sport Action Targets */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              2. Match with Sport Action
            </span>
            <span className="text-[11px] text-slate-400">Drop or Click target</span>
          </div>

          <div className="space-y-3">
            {sportOptions.map((sport) => {
              const matchedEquipmentId = Object.keys(matches).find((eqId) => matches[eqId] === sport);
              const isMatched = !!matchedEquipmentId;
              const matchedItem = matchedEquipmentId
                ? items.find((i) => i.id === matchedEquipmentId)
                : null;
              const isSelected = selectedSport === sport;

              return (
                <div
                  key={sport}
                  onDrop={(e) => handleDrop(e, sport)}
                  onDragOver={handleDragOver}
                  onClick={() => onSportClick(sport)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between select-none cursor-pointer ${
                    isMatched
                      ? `${theme.secondary} ${theme.border}`
                      : isSelected
                      ? `${theme.badgeBg} ${theme.borderActive} shadow-md ring-2 ring-white/30`
                      : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-600 border-dashed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                        isMatched
                          ? `${theme.primary} text-slate-950`
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isMatched ? <CheckCircle2 className="w-5 h-5" /> : '★'}
                    </div>

                    <div>
                      <div className="font-extrabold text-base text-white">{sport}</div>
                      {isMatched && matchedItem && (
                        <div className={`text-xs ${theme.textAccent} font-semibold`}>
                          Matched with: {matchedItem.name}
                        </div>
                      )}
                      {!isMatched && (
                        <div className="text-[11px] text-slate-400">
                          {selectedEquipment
                            ? 'Click here to match with selected gear'
                            : 'Drag gear or click to pair'}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.speakText(sport);
                    }}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                    title={`Listen to ${sport}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
