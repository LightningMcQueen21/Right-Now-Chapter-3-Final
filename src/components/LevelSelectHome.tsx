import React from 'react';
import {
  Trophy,
  Volume2,
  VolumeX,
  Music,
  GraduationCap,
  Sparkles,
  User,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Award,
  Layers
} from 'lucide-react';
import { DifficultyLevel, StageId } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface Props {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onSelectLevelAndPlay: (level: DifficultyLevel, stage?: StageId) => void;
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

const STAGES: { id: StageId; name: string; short: string; desc: string }[] = [
  { id: 1, name: 'Sports Equipment Match', short: 'Equipment', desc: 'Drag-and-drop gear vocabulary' },
  { id: 2, name: 'Action Arena', short: 'Actions', desc: 'Verb-ing sentence building' },
  { id: 3, name: 'Grammar Showdown', short: 'Grammar', desc: 'is / are / negative quiz' },
  { id: 4, name: 'Sports Detective', short: 'Detective', desc: 'A Yucky Game of Table Tennis' },
  { id: 5, name: 'Grand Sports Challenge', short: 'Grand Finale', desc: 'Referee errors & questions' }
];

export const LevelSelectHome: React.FC<Props> = ({
  playerName,
  onPlayerNameChange,
  onSelectLevelAndPlay,
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
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      {/* Top Utility Header */}
      <header className="w-full px-4 py-3 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            🏆
          </div>
          <div>
            <span className="text-xs font-black tracking-wider text-amber-400 uppercase">
              SPORTS MANIA!
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400 ml-2">
              Year 3 English · Right Now (Module 3)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {totalScore > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>{totalScore} pts</span>
            </div>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onOpenTrophies();
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
            title="View Trophies & Certificate"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">My</span> Trophies
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenLessonPlan();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 text-xs font-bold transition-colors cursor-pointer"
            title="EDUP6023 Lesson Plan & Matrix"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden md:inline">EDUP6023</span> Plan
          </button>

          <button
            onClick={() => {
              onToggleMute();
              sound.playClick();
            }}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-blue-300'
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
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isBgmPlaying
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
            }`}
            title={isBgmPlaying ? 'Pause Music' : 'Play Music'}
            aria-label="Toggle Theme Music"
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center">
        {/* Title & Pupil Name Bar */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            YEAR 3 ENGLISH · TOPIC 3: RIGHT NOW
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight drop-shadow-md">
            SPORTS MANIA! THE CHAMPIONSHIP
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-2">
            Choose your difficulty mode below or jump manually into any stage at any time!
          </p>

          {/* Pupil Name Input */}
          <div className="mt-5 inline-flex items-center gap-3 bg-slate-900/90 border-2 border-amber-400/50 px-5 py-2.5 rounded-2xl shadow-lg">
            <User className="w-5 h-5 text-amber-400" />
            <label className="text-xs font-bold text-slate-300 uppercase">Pupil Name:</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => onPlayerNameChange(e.target.value)}
              placeholder="e.g. Alex, Siti, Daniel..."
              className="bg-slate-800 text-white font-bold text-sm px-3 py-1 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* 3 Difficulty Level Cards with Direct Individual Stage Launchers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 1. EASY MODE (Green Interface) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-900 border-3 border-emerald-500/80 p-6 flex flex-col justify-between shadow-xl hover:shadow-emerald-500/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                  GREEN INTERFACE
                </span>
                <span className="text-xs text-emerald-400 font-bold">Weak (10 Pupils)</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center text-2xl font-black mb-2">
                🌱
              </div>

              <h2 className="text-2xl font-black text-white">EASY MODE</h2>
              <div className="text-xs font-semibold text-emerald-400 mb-3">
                Rookie League · Guided Learning
              </div>

              {/* Activity Specs */}
              <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Recognition:</strong> 3 Sports Actions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Sentence:</strong> Guided with Word Banks</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Grammar:</strong> Basic (is/am/are)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Explanation:</strong> Not required</span>
                </li>
              </ul>

              {/* Direct Stage Buttons for Easy Mode */}
              <div className="pt-3 border-t border-emerald-900/60 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Jump Manually to Stage:
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectLevelAndPlay('easy', s.id);
                      }}
                      className="py-1 px-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-colors text-center cursor-pointer"
                      title={`${s.name} (${s.desc})`}
                    >
                      S{s.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWhistle();
                onSelectLevelAndPlay('easy', 1);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Start Easy Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. MEDIUM MODE (Orange Interface) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-900 border-3 border-amber-500/80 p-6 flex flex-col justify-between shadow-xl hover:shadow-amber-500/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                  ORANGE INTERFACE
                </span>
                <span className="text-xs text-amber-400 font-bold">Mid (12 Pupils)</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-2xl font-black mb-2">
                🔥
              </div>

              <h2 className="text-2xl font-black text-white">MEDIUM MODE</h2>
              <div className="text-xs font-semibold text-amber-400 mb-3">
                Pro Division · Semi-Guided
              </div>

              {/* Activity Specs */}
              <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Recognition:</strong> 5 Sports Actions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Sentence:</strong> Verb Inflections (-ing)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Grammar:</strong> Intermediate (isn&apos;t / aren&apos;t)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Explanation:</strong> Short answers provided</span>
                </li>
              </ul>

              {/* Direct Stage Buttons for Medium Mode */}
              <div className="pt-3 border-t border-amber-900/60 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Jump Manually to Stage:
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectLevelAndPlay('medium', s.id);
                      }}
                      className="py-1 px-1 rounded-lg bg-amber-950/80 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold text-xs border border-amber-500/40 transition-colors text-center cursor-pointer"
                      title={`${s.name} (${s.desc})`}
                    >
                      S{s.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWhistle();
                onSelectLevelAndPlay('medium', 1);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Start Medium Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. HARD MODE (Purple Interface) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-purple-950/80 via-slate-900 to-slate-900 border-3 border-purple-500/80 p-6 flex flex-col justify-between shadow-xl hover:shadow-purple-500/20 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-purple-500 text-white font-black text-xs uppercase tracking-wider shadow">
                  PURPLE INTERFACE
                </span>
                <span className="text-xs text-purple-300 font-bold">Advanced (6 Pupils)</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center text-2xl font-black mb-2">
                👑
              </div>

              <h2 className="text-2xl font-black text-white">HARD MODE</h2>
              <div className="text-xs font-semibold text-purple-400 mb-3">
                Champions League · Independent
              </div>

              {/* Activity Specs */}
              <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span><strong>Recognition:</strong> 6 Sports Actions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span><strong>Sentence:</strong> Independent Full Sentences</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span><strong>Grammar:</strong> Advanced (Error spotting &amp; rules)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span><strong>Explanation:</strong> Explain independently!</span>
                </li>
              </ul>

              {/* Direct Stage Buttons for Hard Mode */}
              <div className="pt-3 border-t border-purple-900/60 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Jump Manually to Stage:
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectLevelAndPlay('hard', s.id);
                      }}
                      className="py-1 px-1 rounded-lg bg-purple-950/80 hover:bg-purple-600 hover:text-white text-purple-300 font-bold text-xs border border-purple-500/40 transition-colors text-center cursor-pointer"
                      title={`${s.name} (${s.desc})`}
                    >
                      S{s.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWhistle();
                onSelectLevelAndPlay('hard', 1);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Start Hard Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Manual Stage Selector Bar */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm text-white">
                Direct Stage Navigator (Manual Stage Jump)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Click any stage below to jump straight to that lesson activity:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {STAGES.map((stg) => (
              <div
                key={stg.id}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      {stg.id}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Stage {stg.id}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-200 line-clamp-1">{stg.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{stg.desc}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[10px]">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectLevelAndPlay('easy', stg.id);
                    }}
                    className="flex-1 py-1 rounded bg-emerald-950 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-bold border border-emerald-500/30 transition-colors"
                    title={`Play ${stg.name} in Easy Mode`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectLevelAndPlay('medium', stg.id);
                    }}
                    className="flex-1 py-1 rounded bg-amber-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold border border-amber-500/30 transition-colors"
                    title={`Play ${stg.name} in Medium Mode`}
                  >
                    Med
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectLevelAndPlay('hard', stg.id);
                    }}
                    className="flex-1 py-1 rounded bg-purple-950 hover:bg-purple-600 hover:text-white text-purple-300 font-bold border border-purple-500/30 transition-colors"
                    title={`Play ${stg.name} in Hard Mode`}
                  >
                    Hard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-3 text-xs text-slate-500 bg-slate-950 border-t border-slate-900">
        EDUP6023 Technology For Teaching and Learning · Get Smart Plus 3 (Module 3: Right Now)
      </footer>
    </div>
  );
};
