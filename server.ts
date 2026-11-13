import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const STAGE_CONTEXT_MAP: Record<number, string> = {
  1: 'Stage 1: Sports Equipment Match (Vocabulary: skateboard/skateboarding, baseball bat/playing baseball, table tennis racket/playing table tennis, badminton racket/playing badminton, basketball, gymnastics mat/doing gymnastics).',
  2: 'Stage 2: Action Arena (Picture recognition & Present Continuous sentence building: subject + am/is/are + verb-ing).',
  3: 'Stage 3: Grammar Showdown (Present Continuous grammar: affirmative am/is/are, negative isn\'t/aren\'t, and questions Is/Are).',
  4: 'Stage 4: Sports Detective (Story "A Yucky Game of Table Tennis" featuring Tom, Nancy, and Mrs Clark, Yes/No questions and critical thinking).',
  5: 'Stage 5: The Grand Sports Challenge (Mixed challenge: describing pictures, spotting grammar errors, and forming Is/Are questions).',
};

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

interface ChatContextInput {
  view?: string;
  difficulty?: string;
  stage?: number;
  stageTitle?: string;
  playerName?: string;
}

function buildSystemInstruction(context?: ChatContextInput): string {
  const player = context?.playerName?.trim() || 'Champ';
  const difficulty = context?.difficulty || 'medium';
  const stageInfo =
    context?.view === 'GAME' && context?.stage
      ? STAGE_CONTEXT_MAP[context.stage] || `Stage ${context.stage}`
      : context?.view === 'CHAMPIONSHIP'
        ? 'The Championship Podium screen after finishing challenges.'
        : 'The Level Select Homepage.';

  const levelGuidance =
    difficulty === 'easy'
      ? 'The pupil is in EASY MODE (Green). Use super simple words, short sentences (2-4 short sentences max), lots of warmth, and gentle step-by-step hints.'
      : difficulty === 'hard'
        ? 'The pupil is in HARD MODE (Purple). Encourage them to think independently, explain grammar rules clearly (e.g., why singular subjects use "is" and plural subjects use "are", or how to spot errors), and keep answers concise (3-5 sentences max).'
        : 'The pupil is in MEDIUM MODE (Orange). Use clear, encouraging Year 3 English explanations (2-4 sentences max) with brief examples.';

  return [
    'You are "Coach Buddy", a friendly, supportive AI sports coach & English tutor inside the educational game "Sports Mania! The Championship" (Year 3 English, Get Smart Plus 3, Module 3: Right Now).',
    `You are talking to a Year 3 primary school pupil (around 9 years old) named "${player}".`,
    `Current location in game: ${stageInfo}`,
    levelGuidance,
    'Guidelines:',
    `- Address the pupil warmly by their name "${player}" (for example, starting with "Hi ${player}!" on their first question).`,
    '- Help the pupil understand Present Continuous Tense (am/is/are + verb-ing, negatives like isn\'t/aren\'t, questions like Is he...? / Are they...?), sports vocabulary, and the story "A Yucky Game of Table Tennis".',
    '- If the pupil asks a direct question about a quiz item, guide them with a clear explanation or helpful hint so they learn the rule rather than just giving a bare answer key.',
    '- Keep responses short, clear, upbeat, and easy for a 9-year-old to read. Use simple formatting (short paragraphs or 2-3 bullet points). Avoid long essays.',
    '- Stay safe, age-appropriate, and focused on Year 3 English & sports.',
  ].join('\n');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'AI Coach is not configured yet. Please check GEMINI_API_KEY in Settings > Secrets.',
      });
      return;
    }

    try {
      const body = req.body as {
        messages?: ChatMessageInput[];
        context?: ChatContextInput;
      };

      const messages = Array.isArray(body?.messages) ? body.messages : [];
      const sanitized = messages
        .filter(
          (m) =>
            m &&
            (m.role === 'user' || m.role === 'model') &&
            typeof m.text === 'string' &&
            m.text.trim().length > 0
        )
        .slice(-14);

      if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
        res.status(400).json({ error: 'Please type a question first!' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const historyMessages = sanitized.slice(0, -1);
      const latestUserMessage = sanitized[sanitized.length - 1].text.trim();

      const chat = ai.chats.create({
        model: 'gemini-4-hydrogen',
        history: historyMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
        config: {
          systemInstruction: buildSystemInstruction(body?.context),
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const response = await chat.sendMessage({
        message: latestUserMessage,
      });

      const reply = response.text?.trim();
      if (!reply) {
        res.status(502).json({
          error: 'Coach Buddy could not think of a reply right now. Please try asking again!',
        });
        return;
      }

      res.json({ reply });
    } catch (err: unknown) {
      console.error('Gemini /api/chat error:', err);
      const message = err instanceof Error ? err.message : 'Unexpected error';
      res.status(500).json({
        error:
          message.includes('API_KEY') || message.includes('PERMISSION_DENIED')
            ? 'Please check your GEMINI_API_KEY in Settings > Secrets.'
            : 'Coach Buddy had a quick hiccup! Please try asking again in a moment.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sports Mania server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
