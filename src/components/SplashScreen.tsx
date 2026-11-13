import React from 'react';
import {
  Play,
  BookOpen,
  Trophy,
  Volume2,
  VolumeX,
  Music,
  GraduationCap,
  Sparkles,
  User,
  ShieldAlert
} from 'lucide-react';
import { DifficultyLevel, StageId } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface Props {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  difficulty: DifficultyLevel;
  onDifficultyChange: (lvl: DifficultyLevel) => void;
  onStartGame: (stage?: StageId) => void;
  onOpenHowToPlay: () => void;
  onOpenTrophies: () => void;
  onOpenLessonPlan: () => void;
  isMuted: boolean;
  isBgmPlaying: boolean;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  completedStages: number[];
  totalScore: number;
}

export const SplashScreen: React.FC<Props> = ({
  playerName,
  onPlayerNameChange,
  difficulty,
  onDifficultyChange,
  onStartGame,
  onOpenHowToPlay,
  onOpenTrophies,
  onOpenLessonPlan,
  isMuted,
  isBgmPlaying,
  onToggleMute,
  onToggleBgm,
  completedStages,
  totalScore
}) => {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex flex-col justify-between overflow-x-hidden">
      {/* Top Bar for Teacher / Audio Controls */}
      <div className="relative z-20 w-full px-4 py-3 flex items-center justify-between bg-slate-950/60 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenLessonPlan();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all shadow-sm"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">EDUP6023</span> Lesson Plan &amp; Rubric
          </button>
        </div>

        <div className="flex items-center gap-2">
          {totalScore > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>{totalScore} pts</span>
            </div>
          )}

          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className={`p-2 rounded-full border transition-colors ${
              isMuted
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              onToggleBgm();
              sound.playClick();
            }}
            className={`p-2 rounded-full border transition-colors ${
              isBgmPlaying
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
            }`}
            title={isBgmPlaying ? 'Pause Music' : 'Play Sports Theme Music'}
            aria-label="Toggle Theme Music"
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Hero Container with Cover Art Visuals */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-10 max-w-5xl mx-auto w-full">
        {/* Cover Art Wrapper with Glowing Border */}
        <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/80 bg-slate-900 group">
          {/* Authentic Cover Image provided by User */}
          <img
            src="/assets/aistudio/Sports_Mania_Championship_Splash_Screen__1__3575f9e9.png"
            alt="Sports Mania! The Ultimate Championship - Year 3 English"
            className="w-full h-auto object-cover select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Interactive Overlay matching the Cover Buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Centered Big Action Buttons on the Cover */}
          <div className="absolute inset-x-0 bottom-4 sm:bottom-8 md:bottom-12 flex flex-col items-center justify-center gap-3 px-4 z-10 pointer-events-auto">
            {/* Primary PLAY NOW Button */}
            <button
              onClick={() => {
                sound.playWhistle();
                onStartGame(1);
              }}
              className="group relative px-8 sm:px-14 py-3 sm:py-4 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-yellow-400 text-slate-950 font-black text-xl sm:text-2xl md:text-3xl tracking-wider shadow-2xl shadow-amber-500/50 border-4 border-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950 text-amber-300 flex items-center justify-center shrink-0 shadow-inner">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-300 translate-x-0.5" />
              </div>
              <span className="drop-shadow-sm font-heading">PLAY NOW</span>
            </button>

            {/* Secondary Action Buttons (HOW TO PLAY & MY TROPHIES) */}
            <div className="flex items-center gap-3 sm:gap-6 mt-1">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenHowToPlay();
                }}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide border-2 border-white/60 shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                HOW TO PLAY
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTrophies();
                }}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm tracking-wide border-2 border-white/60 shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                MY TROPHIES
              </button>
            </div>
          </div>
        </div>

        {/* Player Profile & Differentiated Learning Setup Strip */}
        <div className="w-full max-w-4xl mt-6 p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Player Name Input */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/30 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Pupil / Champion Name:
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => onPlayerNameChange(e.target.value)}
                  placeholder="e.g. Adam, Siti, Daniel..."
                  className="w-full px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-semibold"
                />
              </div>
            </div>

            {/* Difficulty Tier Selector (Weak, Medium, Hard) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Differentiated Learning Tier:
                </label>
                <span className="text-[10px] text-amber-300 font-semibold">
                  {difficulty === 'easy' && 'Weak (10 Pupils) · Word Banks & Hints'}
                  {difficulty === 'medium' && 'Intermediate (12 Pupils) · 5 Actions'}
                  {difficulty === 'hard' && 'Advanced (6 Pupils) · Full Sentences'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onDifficultyChange('easy');
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === 'easy'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md ring-2 ring-emerald-400/40'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  Level 1: Rookie
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onDifficultyChange('medium');
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === 'medium'
                      ? 'bg-blue-500 text-white border-blue-300 shadow-md ring-2 ring-blue-400/40'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  Level 2: Pro
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onDifficultyChange('hard');
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === 'hard'
                      ? 'bg-purple-600 text-white border-purple-300 shadow-md ring-2 ring-purple-400/40'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  Level 3: Champion
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stage Jump Map */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Championship Stage Navigation:
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { stg: 1, label: '1. Equipment Match' },
                { stg: 2, label: '2. Action Arena' },
                { stg: 3, label: '3. Grammar Showdown' },
                { stg: 4, label: '4. Sports Detective' },
                { stg: 5, label: '5. Grand Challenge' }
              ].map(({ stg, label }) => {
                const isDone = completedStages.includes(stg);
                return (
                  <button
                    key={stg}
                    onClick={() => {
                      sound.playClick();
                      onStartGame(stg as StageId);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      isDone
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 hover:bg-amber-400/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {isDone ? `★ ${label}` : label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="w-full text-center py-3 text-xs text-slate-400 bg-slate-950/80 border-t border-slate-800">
        EDUP6023 Technology For Teaching and Learning · Topic 3: Right Now (Sports) · Ministry of Education Malaysia (KSSR Year 3)
      </footer>
    </div>
  );
};
