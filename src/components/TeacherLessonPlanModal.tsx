import React from 'react';
import { X, BookOpen, GraduationCap, CheckCircle2, Users, Target, Award, Sparkles } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherLessonPlanModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-2 border-amber-400 rounded-3xl shadow-2xl text-slate-100 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
          aria-label="Close lesson plan modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="p-3 bg-amber-500/20 border border-amber-400/40 rounded-2xl text-amber-400">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                EDUP6023 COURSEWORK ARTIFACT
              </span>
              <span className="text-xs text-slate-400">Technology for Teaching and Learning</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mt-1">
              Lesson Plan & Pedagogical Design Document
            </h2>
            <p className="text-sm text-slate-400">
              Module 3: Right Now (Sports) · Get Smart Plus 3 (Year 3 English CEFR)
            </p>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="space-y-6 text-sm">
          {/* Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                <Target className="w-4 h-4" /> Subject & Theme
              </div>
              <p className="text-slate-200 font-medium">Year 3 English (KSSR Semakan)</p>
              <p className="text-xs text-slate-400 mt-1">World of Self, Family & Friends: Sports & Present Continuous Tense</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
                <Users className="w-4 h-4" /> Class Profile (28 Pupils)
              </div>
              <p className="text-slate-200 font-medium">Mixed Ability Year 3 Class</p>
              <p className="text-xs text-slate-400 mt-1">10 Weak (Level 1), 12 Intermediate (Level 2), 6 Advanced (Level 3)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <BookOpen className="w-4 h-4" /> Core Story & Value
              </div>
              <p className="text-slate-200 font-medium">A Yucky Game of Table Tennis</p>
              <p className="text-xs text-slate-400 mt-1">Value: &quot;Don&apos;t make hasty judgements&quot; (Textbook pp. 33-34)</p>
            </div>
          </div>

          {/* Differentiated Instruction Strategy Matrix */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-850 border border-slate-700">
            <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Differentiated Instruction Matrix (EDUP6023 Requirement)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Level 1: Weak */}
              <div className="p-4 rounded-xl bg-slate-900/80 border-t-4 border-emerald-500 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-emerald-400">LEVEL 1 · ROOKIE LEAGUE</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">10 Pupils (Weak)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Identify 3 sports actions from pictures.</li>
                  <li>Construct 3 simple guided sentences with blanks.</li>
                  <li>Prominent picture clues &amp; word banks provided.</li>
                  <li>Scaffolded prompts: <span className="text-emerald-300 font-mono">&quot;A boy is ______&quot;</span>.</li>
                  <li>Audio read-aloud support for low-readiness readers.</li>
                </ul>
              </div>

              {/* Level 2: Intermediate */}
              <div className="p-4 rounded-xl bg-slate-900/80 border-t-4 border-blue-500 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-blue-400">LEVEL 2 · PRO DIVISION</span>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">12 Pupils (Mid)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Identify 5 sports actions across varied contexts.</li>
                  <li>Construct 5 continuous sentences with verb inflections.</li>
                  <li>Complete verb structures: <span className="text-blue-300 font-mono">&quot;The girls ______ (play) badminton&quot;</span>.</li>
                  <li>Answer interrogative Is/Are sports questions.</li>
                  <li>Interactive investigative mystery solving.</li>
                </ul>
              </div>

              {/* Level 3: Advanced */}
              <div className="p-4 rounded-xl bg-slate-900/80 border-t-4 border-purple-500 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-purple-400">LEVEL 3 · CHAMPIONS LEAGUE</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold">6 Pupils (Advanced)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Identify 6 sports actions and synthesize sports rules.</li>
                  <li>Construct 6 complete sentences independently without banks.</li>
                  <li>Form interrogatives (<span className="text-purple-300 font-mono">&quot;Are they playing...?&quot;</span>).</li>
                  <li>Identify referee grammatical errors (is vs are).</li>
                  <li>Consonant doubling spelling rules (run &rarr; running, hit &rarr; hitting).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5-Stage Curriculum Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              The 5 Game Stages &amp; Pedagogical Intent
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-amber-400/30">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Stage 1: Sports Equipment Match (Vocabulary Acquisition)</h4>
                  <p className="text-xs text-slate-400">
                    Kinesthetic drag-and-drop matching pairing concrete equipment (baseball bat, skateboard, table tennis paddle) with sports nominalisations.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-blue-400/30">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Stage 2: Action Arena (Present Continuous Verb Inflection)</h4>
                  <p className="text-xs text-slate-400">
                    Connects vocabulary with action verbs (hitting, throwing, exercising, skateboarding) and scaffolds sentence building using differentiated word tiles.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-purple-400/30">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Stage 3: Grammar Showdown (Subject-Verb Agreement &amp; Negatives)</h4>
                  <p className="text-xs text-slate-400">
                    Multiple-choice quiz targeting auxiliary selection (am/is/are), negative contractions (isn&apos;t/aren&apos;t), and immediate grammar rule debriefs.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-400/30">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Stage 4: Sports Detective (Critical Thinking &amp; Narrative Investigation)</h4>
                  <p className="text-xs text-slate-400">
                    Integrates the textbook literature &quot;A Yucky Game of Table Tennis&quot; (Tom, Nancy, Mrs Clark, watering plants, egg mistake) with Yes/No question verification and the moral value: &quot;Don&apos;t make hasty judgements.&quot;
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-yellow-400/30">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Stage 5: The Grand Sports Challenge (Mastery &amp; Assessment)</h4>
                  <p className="text-xs text-slate-400">
                    Comprehensive synthesis combining error detection (Referee Red Card), question formulation with Is/Are, and certificate generation for authentic learning celebration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CEFR & 21st Century Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> CEFR Year 3 Learning Standards
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li><strong className="text-white">BI 1.2:</strong> Understand meaning in a variety of familiar contexts (sports speech).</li>
                <li><strong className="text-white">BI 2.1:</strong> Communicate simple information about sports actions intelligibly.</li>
                <li><strong className="text-white">BI 3.2:</strong> Understand linear and non-linear digital texts and story dialogues.</li>
                <li><strong className="text-white">BI 4.2:</strong> Form basic sentences with correct capitalization and punctuation.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <h4 className="font-semibold text-rose-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-400" /> 21st Century Competencies (PAK21)
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li><strong className="text-white">Critical Thinking:</strong> Differentiating between actual rain and Mrs Clark&apos;s hose; identifying eggs vs ping pong balls.</li>
                <li><strong className="text-white">Communication:</strong> Reading aloud and listening via built-in Web Speech synthesis.</li>
                <li><strong className="text-white">Autonomous Learning:</strong> Self-paced game navigation, instant feedback, retry affordances.</li>
                <li><strong className="text-white">Values:</strong> Fostering patience, teamwork, and not making hasty judgements.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-500/30"
          >
            Close Lesson Plan
          </button>
        </div>
      </div>
    </div>
  );
};
