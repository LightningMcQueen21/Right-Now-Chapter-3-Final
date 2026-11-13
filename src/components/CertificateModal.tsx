import React, { useRef } from 'react';
import { X, Printer, Trophy, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { DifficultyLevel } from '../types/gameTypes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  totalScore: number;
  totalStars: number;
  difficulty: DifficultyLevel;
}

export const CertificateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  playerName,
  totalScore,
  totalStars,
  difficulty
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const levelName =
    difficulty === 'easy'
      ? 'Rookie League (Level 1)'
      : difficulty === 'medium'
      ? 'Pro Division (Level 2)'
      : 'Champions League (Level 3)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border-4 border-amber-400 rounded-3xl shadow-2xl p-6 md:p-8 text-slate-100 print:border-none print:shadow-none print:p-0 print:max-w-none print:max-h-none print:bg-white print:text-black">
        {/* Controls - Hidden in print */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-amber-300 text-sm">Official Championship Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div
          ref={printRef}
          className="relative bg-gradient-to-b from-amber-50 via-white to-amber-50 border-8 border-amber-600 rounded-2xl p-8 md:p-12 text-slate-900 shadow-inner text-center font-serif print:rounded-none print:border-8 print:border-amber-700"
        >
          {/* Ornate Inner Border */}
          <div className="border-2 border-dashed border-amber-500 p-6 md:p-8 rounded-xl relative">
            {/* Header Stamp */}
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-600 flex items-center justify-center shadow-lg text-amber-950">
                <Trophy className="w-9 h-9" />
              </div>
            </div>

            <div className="text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
              EDUP6023 Technology For Teaching and Learning · Year 3 English
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 tracking-tight font-serif mt-2 mb-1">
              CERTIFICATE OF ACHIEVEMENT
            </h1>
            <p className="text-xs text-amber-700 font-sans uppercase tracking-wider mb-6">
              Sports Mania! The Ultimate Championship · Module 3: Right Now
            </p>

            <div className="text-sm font-sans text-slate-600 mb-2">
              This certificate of sportsmanship and linguistic excellence is proudly presented to:
            </div>

            {/* Recipient Name */}
            <div className="my-4 pb-2 border-b-2 border-amber-600 max-w-md mx-auto">
              <span className="text-3xl md:text-4xl font-bold font-sans text-blue-900 tracking-wide">
                {playerName || 'Star Pupil'}
              </span>
            </div>

            {/* Accomplishment description */}
            <p className="text-xs md:text-sm text-slate-700 max-w-lg mx-auto font-sans leading-relaxed mb-6">
              For mastering the Present Continuous Tense, sports equipment vocabulary, and successfully solving the mystery of <span className="font-semibold italic">&quot;A Yucky Game of Table Tennis&quot;</span> in the Year 3 English CEFR curriculum!
            </p>

            {/* Badges / Metrics Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 my-6 font-sans">
              <div className="px-4 py-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 text-xs text-left">
                <span className="block text-[10px] text-amber-700 font-bold uppercase">Difficulty Cleared</span>
                <span className="font-bold text-sm text-amber-900">{levelName}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 text-xs text-left">
                <span className="block text-[10px] text-amber-700 font-bold uppercase">Championship Score</span>
                <span className="font-bold text-sm text-amber-900">{totalScore} Points</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 text-xs text-left">
                <span className="block text-[10px] text-amber-700 font-bold uppercase">Gold Stars</span>
                <span className="font-bold text-sm text-amber-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                  {totalStars} / 15 Stars
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="grid grid-cols-2 gap-8 pt-6 mt-6 border-t border-amber-200 font-sans text-xs">
              <div className="text-center">
                <div className="font-serif italic text-base text-slate-800 mb-1">
                  EDUP6023 Evaluator
                </div>
                <div className="border-t border-slate-400 pt-1 text-slate-600">
                  English Language Teacher / Instructor
                </div>
              </div>

              <div className="text-center">
                <div className="font-mono text-sm text-amber-800 font-bold mb-1">
                  {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="border-t border-slate-400 pt-1 text-slate-600">
                  Date of Award
                </div>
              </div>
            </div>

            {/* Golden Star Emblem */}
            <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 text-xs font-sans font-semibold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>&quot;Don&apos;t make hasty judgements · Learn, Play, Win!&quot;</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
