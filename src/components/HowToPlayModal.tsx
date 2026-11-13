import React from 'react';
import { X, Volume2, Trophy, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartPlaying: () => void;
}

export const HowToPlayModal: React.FC<Props> = ({ isOpen, onClose, onStartPlaying }) => {
  if (!isOpen) return null;

  const steps = [
    {
      stage: '1',
      title: 'Sports Equipment Match',
      desc: 'Drag the sports gear (like a skateboard, baseball bat, or table tennis paddle) to match the correct sport name!',
      icon: '🛹'
    },
    {
      stage: '2',
      title: 'Action Arena',
      desc: 'Look at what the kids are doing! Pick the right action word and build sentences using words ending in "-ing" (like hitting, running, or exercising).',
      icon: '🏃'
    },
    {
      stage: '3',
      title: 'Grammar Showdown',
      desc: 'Choose "am", "is", or "are", and negative words like "isn\'t" and "aren\'t" to score championship points in the stadium!',
      icon: '⚡'
    },
    {
      stage: '4',
      title: 'Sports Detective',
      desc: 'Investigate the funny story "A Yucky Game of Table Tennis"! Answer Yes or No questions with Tom, Nancy, and Mrs Clark.',
      icon: '🔍'
    },
    {
      stage: '5',
      title: 'The Grand Sports Challenge',
      desc: 'Solve the referee\'s red card mistakes, build complete questions, and claim your Golden Championship Trophy!',
      icon: '🏆'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-blue-900 to-indigo-950 border-4 border-amber-400 rounded-3xl shadow-2xl text-white p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close how to play modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40 mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            CHAMPIONSHIP RULES FOR YEAR 3
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-amber-300 tracking-wide drop-shadow-md">
            HOW TO PLAY SPORTS MANIA!
          </h2>
          <p className="text-sm text-blue-200 mt-1">
            Complete all 5 stages to become the ultimate Year 3 English Sports Champion!
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-3 mb-6">
          {steps.map((step) => (
            <div
              key={step.stage}
              className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                {step.stage}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.icon}</span>
                  <h3 className="font-bold text-base text-amber-200">{step.title}</h3>
                  <button
                    onClick={() => sound.speakText(`${step.title}. ${step.desc}`)}
                    className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition-colors"
                    title="Listen to instructions"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-blue-100 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tips Box */}
        <div className="p-4 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-start gap-3 mb-6">
          <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xs text-amber-100">
            <p className="font-bold text-amber-200 text-sm">Coach&apos;s Pro Tip:</p>
            <p className="mt-0.5">
              Listen closely to each audio clue by clicking the speaker icon. Take your time, think about whether one person (&quot;is&quot;) or more people (&quot;are&quot;) are playing!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            Got It!
          </button>
          <button
            onClick={() => {
              sound.playWhistle();
              onStartPlaying();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-transform active:scale-95"
          >
            <Check className="w-5 h-5" />
            Play Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
