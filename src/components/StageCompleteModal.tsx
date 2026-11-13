import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { StageId } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface Props {
  isOpen: boolean;
  stageId: StageId;
  scoreEarned: number;
  starsEarned: number;
  stageTitle: string;
  onNextStage: () => void;
  onReplayStage: () => void;
  onOpenTrophies: () => void;
}

export const StageCompleteModal: React.FC<Props> = ({
  isOpen,
  stageId,
  scoreEarned,
  starsEarned,
  stageTitle,
  onNextStage,
  onReplayStage,
  onOpenTrophies
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 border-4 border-amber-400 rounded-3xl shadow-2xl p-6 md:p-8 text-center text-white">
        {/* Championship Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 font-black text-xs border border-amber-400/40 mb-3 uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          Stage {stageId} Victory!
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-amber-300 tracking-wide drop-shadow">
          FANTASTIC JOB!
        </h2>
        <p className="text-sm text-blue-200 mt-1">{stageTitle} Cleared!</p>

        {/* Stars Animation */}
        <div className="flex items-center justify-center gap-3 my-6">
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= starsEarned;
            return (
              <div
                key={starIdx}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform ${
                  isEarned
                    ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/30'
                    : 'bg-white/10 text-white/30 scale-95'
                }`}
              >
                <Star
                  className={`w-9 h-9 ${
                    isEarned ? 'fill-amber-950 text-amber-950' : 'text-white/30'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Score & Accomplishment summary */}
        <div className="bg-white/10 rounded-2xl p-4 border border-white/10 mb-6">
          <div className="text-xs text-blue-200 uppercase font-semibold">Stage Score</div>
          <div className="text-3xl font-black text-amber-400 mt-1">+{scoreEarned} PTS</div>
          <p className="text-xs text-slate-300 mt-2">
            You successfully demonstrated mastery of the Year 3 English Present Continuous Tense!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onReplayStage();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Play Stage Again
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenTrophies();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-400/40 text-purple-200 font-semibold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Award className="w-4 h-4 text-purple-300" />
            My Trophies
          </button>

          <button
            onClick={() => {
              sound.playWhistle();
              onNextStage();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
          >
            <span>{stageId === 5 ? 'Championship Finale!' : 'Next Stage'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
