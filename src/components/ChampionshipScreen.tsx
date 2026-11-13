import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Star,
  Printer,
  RotateCcw,
  Home,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { DifficultyLevel, StageId, LEVEL_THEMES } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface Props {
  playerName: string;
  difficulty: DifficultyLevel;
  scores: Record<StageId, number>;
  stars: Record<StageId, number>;
  onPlayAgainSameLevel: () => void;
  onGoHome: () => void;
  onOpenCertificate: () => void;
}

const STAGE_LABELS: Record<StageId, string> = {
  1: 'Stage 1: Equipment Match',
  2: 'Stage 2: Action Arena',
  3: 'Stage 3: Grammar Showdown',
  4: 'Stage 4: Sports Detective',
  5: 'Stage 5: Grand Challenge'
};

export const ChampionshipScreen: React.FC<Props> = ({
  playerName,
  difficulty,
  scores,
  stars,
  onPlayAgainSameLevel,
  onGoHome,
  onOpenCertificate
}) => {
  const theme = LEVEL_THEMES[difficulty];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalStars = Object.values(stars).reduce((a, b) => a + b, 0);

  useEffect(() => {
    sound.playFanfare();
    try {
      const end = Date.now() + 2.5 * 1000;
      const colors =
        difficulty === 'easy'
          ? ['#10B981', '#34D399', '#FBBF24']
          : difficulty === 'medium'
          ? ['#F59E0B', '#F97316', '#FDE047']
          : ['#A855F7', '#8B5CF6', '#FBBF24'];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // Confetti fallback
    }
  }, [difficulty]);

  const divisionName =
    difficulty === 'easy'
      ? 'Rookie League Champion (Easy Mode)'
      : difficulty === 'medium'
      ? 'Pro Division Champion (Medium Mode)'
      : 'Grand Master Champion (Hard Mode)';

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b ${theme.gradientBg} text-white p-4 sm:p-8 flex flex-col items-center justify-center animate-fade-in`}>
      <div className={`w-full max-w-4xl bg-slate-900/95 border-4 ${theme.borderActive} rounded-3xl shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden`}>
        {/* Glow ambient background */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 ${
            difficulty === 'easy'
              ? 'bg-emerald-500'
              : difficulty === 'medium'
              ? 'bg-amber-500'
              : 'bg-purple-600'
          }`}
        />

        {/* Top Trophy Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 font-black text-xs uppercase tracking-widest border border-amber-400/40 mb-4 shadow">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Official Championship Podium
        </div>

        {/* Big Trophy Graphic */}
        <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36 mb-4 flex items-center justify-center">
          <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center shadow-2xl border-4 border-white text-slate-950 transform rotate-1 hover:rotate-0 transition-transform">
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md text-amber-950" />
          </div>
          <div className="absolute -bottom-2 px-4 py-1 rounded-full bg-slate-950 border border-amber-400 text-amber-300 font-black text-xs shadow-md">
            1ST PLACE
          </div>
        </div>

        {/* Champion Name & Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight drop-shadow-md">
          CONGRATULATIONS, {playerName ? playerName.toUpperCase() : 'CHAMPION'}!
        </h1>
        <div className={`text-base sm:text-lg font-bold ${theme.textAccent} mt-1 mb-6`}>
          {divisionName}
        </div>

        {/* Big Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Final Total Score</span>
            <span className="text-3xl font-black text-amber-400 mt-1 block">{totalScore} PTS</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Total Stars</span>
            <span className="text-3xl font-black text-yellow-300 mt-1 flex items-center justify-center gap-1">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              {totalStars} / 15
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white/10 border border-white/10 text-center">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Stages Mastered</span>
            <span className="text-3xl font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-6 h-6" />
              5 / 5
            </span>
          </div>
        </div>

        {/* Stage-by-Stage Individual Breakdown */}
        <div className="bg-slate-950/70 rounded-2xl p-4 sm:p-5 border border-slate-800 max-w-2xl mx-auto mb-8 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" /> Individual Stage Score Breakdown:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {([1, 2, 3, 4, 5] as StageId[]).map((stg) => {
              const sc = scores[stg] || 0;
              const st = stars[stg] || 0;
              return (
                <div
                  key={stg}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-200 block">{STAGE_LABELS[stg]}</span>
                    <span className="text-[11px] text-slate-400">Score: {sc} pts</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span>{st}★</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              sound.playFanfare();
              onOpenCertificate();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Save Certificate
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgainSameLevel();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Play This Level Again
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            Change Difficulty Level
          </button>
        </div>
      </div>
    </div>
  );
};
