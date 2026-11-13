import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Volume2,
  RotateCcw,
  Bot,
  Loader2,
} from 'lucide-react';
import { DifficultyLevel, StageId, LEVEL_THEMES } from '../types/gameTypes';
import { sound } from '../services/soundEngine';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface Props {
  view: 'HOME' | 'GAME' | 'CHAMPIONSHIP';
  currentStage: StageId;
  stageTitle: string;
  difficulty: DifficultyLevel;
  playerName: string;
}

const QUICK_PROMPTS: Record<'HOME' | 'GAME' | 'CHAMPIONSHIP', string[]> = {
  HOME: [
    'Which level should I pick?',
    'When do I use "is" vs "are"?',
    'How do I add -ing to verbs?',
  ],
  GAME: [
    'When do I use "is" vs "are"?',
    'How do I make a negative sentence?',
    'Explain "A Yucky Game of Table Tennis"',
    'How do I form a question with Is/Are?',
  ],
  CHAMPIONSHIP: [
    'Review Present Continuous rules',
    'Give me a bonus sports quiz question!',
  ],
};

export const AiTutorWidget: React.FC<Props> = ({
  view,
  currentStage,
  stageTitle,
  difficulty,
  playerName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const displayName = playerName?.trim() || 'Champ';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi ${displayName}! I'm Coach Buddy. Stuck on a word, grammar rule, or story question? Ask me anything!`,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = view === 'GAME' ? LEVEL_THEMES[difficulty] : null;

  const accentButtonClass = theme
    ? `${theme.primary} ${difficulty === 'hard' ? 'text-white' : 'text-slate-950'} ${theme.border}`
    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-300';

  const headerBadgeClass = theme
    ? `${theme.primary} ${difficulty === 'hard' ? 'text-white' : 'text-slate-950'}`
    : 'bg-amber-400 text-slate-950';

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === 'welcome'
          ? {
              ...m,
              text: `Hi ${displayName}! I'm Coach Buddy. Stuck on a word, grammar rule, or story question? Ask me anything!`,
            }
          : m
      )
    );
  }, [displayName]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    sound.playClick();
    setError(null);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = nextMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          context: {
            view,
            difficulty,
            stage: currentStage,
            stageTitle,
            playerName,
          },
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'Could not get an answer right now.');
      }

      const aiMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        text: data.reply,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong. Please try again!';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setError(null);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: `Hi ${playerName?.trim() || 'Champ'}! Ready for more questions. What can I help you with?`,
      },
    ]);
  };

  const quickPrompts = QUICK_PROMPTS[view];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[370px] max-h-[75vh] h-[470px] rounded-3xl bg-slate-900/95 backdrop-blur-xl border-2 border-slate-700 shadow-2xl flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Ask Coach Buddy AI Chatbot"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow ${headerBadgeClass}`}>
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm text-white truncate">Coach Buddy</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                    AI Helper
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {view === 'GAME'
                    ? `Hi ${displayName}! · Stage ${currentStage}`
                    : `Hi ${displayName}! Ask any English question!`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Start New Chat"
                aria-label="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Minimize Chat"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 bg-slate-900/60"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                      isUser
                        ? 'bg-amber-400 text-slate-950 font-semibold rounded-br-sm'
                        : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-sm'
                    }`}
                  >
                    <div>{msg.text}</div>
                    {!isUser && (
                      <button
                        onClick={() => sound.speakText(msg.text)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 text-slate-300 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-xs flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Coach Buddy is thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs">
                {error}
              </div>
            )}
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex flex-wrap gap-1.5">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium transition-colors text-left cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 bg-slate-800 text-white placeholder:text-slate-400 text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button (Bottom-Right) */}
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen((prev) => !prev);
        }}
        className={`group flex items-center gap-2 px-4 py-3 rounded-full border-2 font-black text-xs sm:text-sm shadow-2xl transition-all active:scale-95 cursor-pointer ${accentButtonClass}`}
        aria-label={isOpen ? 'Close AI Helper' : 'Ask AI Helper'}
        title="Need help? Ask Coach Buddy!"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Close Help</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
              <Sparkles className="w-3 h-3 absolute -top-1.5 -right-1.5 animate-pulse" />
            </div>
            <span>Ask Coach AI</span>
          </>
        )}
      </button>
    </div>
  );
};
