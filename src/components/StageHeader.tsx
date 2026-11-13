import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  Home,
  Star,
  Trophy,
  GraduationCap,
  ChevronDown,
  Layers
} from 'lucide-react';
import { DifficultyLevel, StageId, LEVEL_THEMES } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface Props {
  currentStage: StageId;
  difficulty: DifficultyLevel;
  totalScore: number;
  totalStars: number;
  playerName: string;
  isMuted: boolean;
  isBgmPlaying: boolean;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  onGoHome: () => void;
  onOpenLessonPlan: () => void;
  onOpenTrophies: () => void;
  onChangeDifficulty: (lvl: DifficultyLevel) => void;
  onSelectStage: (stage: StageId) => void;
  onGoToChampionship: () => void;
}

const STAGE_TITLES: Record<StageId, string> = {
  1: 'Stage 1: Equipment Match',
  2: 'Stage 2: Action Arena',
  3: 'Stage 3: Grammar Showdown',
  4: 'Stage 4: Sports Detective',
  5: 'Stage 5: Grand Challenge'
};

export const StageHeader: React.FC<Props> = ({
  currentStage,
  difficulty,
  totalScore,
  totalStars,
  playerName,
  isMuted,
  isBgmPlaying,
  onToggleMute,
  onToggleBgm,
  onGoHome,
  onOpenLessonPlan,
  onOpenTrophies,
  onChangeDifficulty,
  onSelectStage,
  onGoToChampionship
}) => {
  const theme = LEVEL_THEMES[difficulty];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b-2 ${theme.headerBorder} px-3 md:px-6 py-2.5 text-white shadow-lg transition-colors`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Home Button & Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Return to Level Selection"
          >
            <Home className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${theme.textAccent}`}>
                {difficulty.toUpperCase()} MODE ({difficulty === 'easy' ? 'GREEN' : difficulty === 'medium' ? 'ORANGE' : 'PURPLE'})
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-500">|</span>
              <span className="hidden sm:inline-block text-[11px] text-slate-300">
                Pupil: <strong className="text-white">{playerName || 'Star Pupil'}</strong>
              </span>
            </div>
            <h1 className="text-sm md:text-base font-extrabold text-white truncate max-w-[180px] sm:max-w-xs md:max-w-none">
              {STAGE_TITLES[currentStage]}
            </h1>
          </div>
        </div>

        {/* Center: Interactive Stage Switcher Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 font-bold uppercase px-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" /> Stages:
          </span>
          {([1, 2, 3, 4, 5] as StageId[]).map((stg) => {
            const isActive = currentStage === stg;
            return (
              <button
                key={stg}
                onClick={() => {
                  sound.playClick();
                  onSelectStage(stg);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? `${theme.primary} text-slate-950 shadow-md font-black ring-1 ring-white/50`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={`Jump directly to ${STAGE_TITLES[stg]}`}
              >
                Stage {stg}
              </button>
            );
          })}

          <button
            onClick={() => {
              sound.playFanfare();
              onGoToChampionship();
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/30 transition-all ml-1 cursor-pointer"
            title="View Final Championship Podium"
          >
            🏆 Podium
          </button>
        </div>

        {/* Mobile Stage Selector Dropdown */}
        <div className="relative lg:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold flex items-center gap-1.5 ${theme.textAccent}`}
          >
            <span>Stage {currentStage}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Stage:
              </div>
              {([1, 2, 3, 4, 5] as StageId[]).map((stg) => (
                <button
                  key={stg}
                  onClick={() => {
                    sound.playClick();
                    onSelectStage(stg);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between ${
                    currentStage === stg
                      ? `${theme.primary} text-slate-950`
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{STAGE_TITLES[stg]}</span>
                  {currentStage === stg && <span>✓</span>}
                </button>
              ))}
              <div className="border-t border-slate-800 mt-1 pt-1">
                <button
                  onClick={() => {
                    sound.playFanfare();
                    onGoToChampionship();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-bold text-amber-300 hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Championship Podium</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Difficulty switcher, Scores, Sound & Tools */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Level Switcher */}
          <div className="hidden sm:flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                onChangeDifficulty('easy');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                difficulty === 'easy'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onChangeDifficulty('medium');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                difficulty === 'medium'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onChangeDifficulty('hard');
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                difficulty === 'hard'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hard
            </button>
          </div>

          {/* Scores & Stars */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
            <div className="flex items-center gap-1 text-amber-300 font-black text-xs md:text-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{totalScore}</span>
            </div>
            <div className="w-[1px] h-3 bg-slate-700" />
            <div className="flex items-center gap-1 text-yellow-300 font-bold text-xs md:text-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{totalStars}</span>
            </div>
          </div>

          {/* Audio & Lesson Plan Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                onToggleMute();
                sound.playClick();
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-blue-300'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label="Mute / Unmute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                onToggleBgm();
                sound.playClick();
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBgmPlaying
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-400/50'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400'
              }`}
              title={isBgmPlaying ? 'Pause Music' : 'Play Theme Music'}
              aria-label="Toggle Background Music"
            >
              <Music className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenLessonPlan();
              }}
              className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition-colors cursor-pointer"
              title="Lesson Plan & Rubric (EDUP6023)"
              aria-label="Lesson Plan"
            >
              <GraduationCap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
