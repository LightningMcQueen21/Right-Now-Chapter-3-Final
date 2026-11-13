import React from 'react';
import { X, Trophy as TrophyIcon, Star, Award, Lock, CheckCircle2, FileText } from 'lucide-react';
import { Trophy } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  trophies: Trophy[];
  scores: Record<number, number>;
  stars: Record<number, number>;
  playerName: string;
  onOpenCertificate: () => void;
}

export const TrophiesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  trophies,
  scores,
  stars,
  playerName,
  onOpenCertificate
}) => {
  if (!isOpen) return null;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalStars = Object.values(stars).reduce((a, b) => a + b, 0);
  const unlockedCount = trophies.filter((t) => t.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-900 to-indigo-950 border-4 border-amber-400 rounded-3xl shadow-2xl text-white p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close trophies modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40 mb-2">
            <TrophyIcon className="w-4 h-4 text-amber-300" />
            YEAR 3 SPORTS TROPHY ROOM
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-amber-300 tracking-wide drop-shadow-md">
            MY CHAMPIONSHIP TROPHIES
          </h2>
          <p className="text-sm text-blue-200 mt-1">
            Player: <span className="font-bold text-white">{playerName || 'Star Pupil'}</span> · Trophies Unlocked: {unlockedCount} / {trophies.length}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-center">
            <div className="text-xs text-blue-200 font-medium">Total Score</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{totalScore} pts</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-center">
            <div className="text-xs text-blue-200 font-medium">Championship Stars</div>
            <div className="text-2xl font-black text-yellow-300 mt-1 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-400" />
              {totalStars} / 15
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-center">
            <div className="text-xs text-blue-200 font-medium">Trophy Badges</div>
            <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <Award className="w-5 h-5" />
              {unlockedCount} / 5
            </div>
          </div>
        </div>

        {/* Trophy Cards Grid */}
        <div className="space-y-3 mb-6">
          {trophies.map((trophy) => {
            const isUnlocked = trophy.unlocked;
            return (
              <div
                key={trophy.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border-amber-400/50 shadow-md'
                    : 'bg-white/5 border-white/10 opacity-70'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 text-slate-950 ring-2 ring-amber-300/60'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isUnlocked ? (
                    <TrophyIcon className="w-7 h-7 drop-shadow" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-base ${isUnlocked ? 'text-amber-200' : 'text-slate-400'}`}>
                      {trophy.title}
                    </h3>
                    {isUnlocked && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{trophy.subtitle}</p>
                  <div className="text-[11px] text-blue-300 mt-1">
                    Requirement: Complete Stage {trophy.stageRequired} (Target: {trophy.scoreRequired} pts)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Button & Close */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              sound.playFanfare();
              onOpenCertificate();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-transform active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Print / View Official Certificate
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors text-center"
          >
            Back to Stadium
          </button>
        </div>
      </div>
    </div>
  );
};
