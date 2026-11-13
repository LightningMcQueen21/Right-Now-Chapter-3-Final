export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type StageId = 1 | 2 | 3 | 4 | 5;

export interface EquipmentItem {
  id: string;
  name: string;
  sport: string;
  iconName: string;
  description: string;
  color: string;
  hint: string;
}

export interface ActionItem {
  id: string;
  action: string;
  verb: string;
  subject: string;
  fullSentence: string;
  iconName: string;
  hint: string;
  options?: string[];
  missingWord?: string;
  scrambledWords?: string[];
  // Independent explanation challenge for Hard mode
  explanationPrompt?: string;
  explanationOptions?: string[];
  correctExplanation?: string;
}

export interface GrammarQuestion {
  id: string;
  prompt: string;
  sentenceWithBlank: string;
  options: string[];
  correctAnswer: string;
  shortExplanation?: string;
  ruleHint: string;
  type: 'auxiliary' | 'negative' | 'question' | 'plural';
  // Independent explanation challenge for Hard mode
  explanationPrompt?: string;
  explanationOptions?: string[];
  correctExplanation?: string;
}

export interface DetectiveScene {
  id: string;
  sceneTitle: string;
  sceneNumber: number;
  storyContext: string;
  dialogueQuote: string;
  character: string;
  action: string;
  question: string;
  correctAnswer: 'Yes' | 'No';
  followUpSentence: string;
  clueHint: string;
  evidenceType: string;
  sceneIllustration: string;
}

export interface GrandChallengeItem {
  id: string;
  type: 'describe_action' | 'fix_error' | 'form_question' | 'complete_dialogue';
  title: string;
  instruction: string;
  contextText: string;
  visualCue: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  wordsToOrder?: string[];
  explanationOptions?: string[];
  correctExplanation?: string;
}

export interface Trophy {
  id: string;
  title: string;
  subtitle: string;
  stageRequired: StageId;
  icon: string;
  color: string;
  unlocked: boolean;
  scoreRequired: number;
}

export interface ThemeColors {
  level: DifficultyLevel;
  primary: string;
  primaryHover: string;
  secondary: string;
  border: string;
  borderActive: string;
  textAccent: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  gradientBg: string;
  headerBorder: string;
}

export const LEVEL_THEMES: Record<DifficultyLevel, ThemeColors> = {
  easy: {
    level: 'easy',
    primary: 'bg-emerald-500',
    primaryHover: 'hover:bg-emerald-400',
    secondary: 'bg-emerald-950/60',
    border: 'border-emerald-500/40',
    borderActive: 'border-emerald-400',
    textAccent: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
    cardBg: 'bg-emerald-950/40',
    gradientBg: 'from-emerald-950 via-slate-900 to-slate-950',
    headerBorder: 'border-emerald-400/50'
  },
  medium: {
    level: 'medium',
    primary: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-400',
    secondary: 'bg-amber-950/60',
    border: 'border-amber-500/40',
    borderActive: 'border-amber-400',
    textAccent: 'text-amber-300',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300',
    cardBg: 'bg-amber-950/40',
    gradientBg: 'from-amber-950 via-slate-900 to-slate-950',
    headerBorder: 'border-amber-400/50'
  },
  hard: {
    level: 'hard',
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-500',
    secondary: 'bg-purple-950/60',
    border: 'border-purple-500/40',
    borderActive: 'border-purple-400',
    textAccent: 'text-purple-300',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-300',
    cardBg: 'bg-purple-950/40',
    gradientBg: 'from-purple-950 via-slate-900 to-slate-950',
    headerBorder: 'border-purple-400/50'
  }
};
