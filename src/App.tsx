/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DifficultyLevel,
  StageId,
  Trophy,
  LEVEL_THEMES
} from './types/gameTypes';
import { INITIAL_TROPHIES } from './data/gameData';
import { sound } from './services/soundEngine';
import { LevelSelectHome } from './components/LevelSelectHome';
import { StageHeader } from './components/StageHeader';
import { Stage1EquipmentMatch } from './components/Stage1EquipmentMatch';
import { Stage2ActionArena } from './components/Stage2ActionArena';
import { Stage3GrammarShowdown } from './components/Stage3GrammarShowdown';
import { Stage4SportsDetective } from './components/Stage4SportsDetective';
import { Stage5GrandChallenge } from './components/Stage5GrandChallenge';
import { ChampionshipScreen } from './components/ChampionshipScreen';
import { HowToPlayModal } from './components/HowToPlayModal';
import { TrophiesModal } from './components/TrophiesModal';
import { TeacherLessonPlanModal } from './components/TeacherLessonPlanModal';
import { CertificateModal } from './components/CertificateModal';
import { StageCompleteModal } from './components/StageCompleteModal';
import { AiTutorWidget } from './components/AiTutorWidget';

export default function App() {
  const [view, setView] = useState<'HOME' | 'GAME' | 'CHAMPIONSHIP'>('HOME');
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [playerName, setPlayerName] = useState<string>('Alex');

  const [scores, setScores] = useState<Record<StageId, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });

  const [stars, setStars] = useState<Record<StageId, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });

  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>(INITIAL_TROPHIES);

  // Audio settings
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  // Modals
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isTrophiesOpen, setIsTrophiesOpen] = useState(false);
  const [isLessonPlanOpen, setIsLessonPlanOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isStageCompleteOpen, setIsStageCompleteOpen] = useState(false);
  const [stageCompleteData, setStageCompleteData] = useState<{
    stageId: StageId;
    score: number;
    stars: number;
    title: string;
  }>({
    stageId: 1,
    score: 0,
    stars: 0,
    title: ''
  });

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalStars = Object.values(stars).reduce((a, b) => a + b, 0);

  const STAGE_NAMES: Record<StageId, string> = {
    1: 'Sports Equipment Match',
    2: 'Action Arena',
    3: 'Grammar Showdown',
    4: 'Sports Detective',
    5: 'The Grand Sports Challenge'
  };

  const theme = LEVEL_THEMES[difficulty];

  // Start game with chosen difficulty and optional direct stage jump
  const handleSelectLevelAndPlay = (lvl: DifficultyLevel, stageId: StageId = 1) => {
    setDifficulty(lvl);
    setCurrentStage(stageId);
    setView('GAME');
  };

  const handleSelectStage = (stageId: StageId) => {
    setCurrentStage(stageId);
    setView('GAME');
  };

  const handleGoHome = () => {
    setView('HOME');
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const handleToggleBgm = () => {
    const next = sound.toggleBgm();
    setIsBgmPlaying(next);
  };

  // Stage completion handler
  const handleStageComplete = (scoreEarned: number, starsEarned: number) => {
    const updatedScores = {
      ...scores,
      [currentStage]: Math.max(scores[currentStage], scoreEarned)
    };
    const updatedStars = {
      ...stars,
      [currentStage]: Math.max(stars[currentStage], starsEarned)
    };
    setScores(updatedScores);
    setStars(updatedStars);

    if (!completedStages.includes(currentStage)) {
      setCompletedStages([...completedStages, currentStage]);
    }

    // Unlock trophies
    const updatedTrophies = trophies.map((trophy) => {
      if (trophy.stageRequired === currentStage) {
        return { ...trophy, unlocked: true };
      }
      return trophy;
    });
    setTrophies(updatedTrophies);

    setStageCompleteData({
      stageId: currentStage,
      score: scoreEarned,
      stars: starsEarned,
      title: STAGE_NAMES[currentStage]
    });
    setIsStageCompleteOpen(true);
  };

  const handleNextStage = () => {
    setIsStageCompleteOpen(false);
    if (currentStage < 5) {
      setCurrentStage((prev) => (prev + 1) as StageId);
    } else {
      // Completed Stage 5 -> Go to Championship Screen
      setView('CHAMPIONSHIP');
    }
  };

  const handleReplayCurrentStage = () => {
    setIsStageCompleteOpen(false);
    const curr = currentStage;
    setCurrentStage(curr);
  };

  return (
    <div className={`min-h-screen w-full bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950`}>
      {view === 'HOME' && (
        <LevelSelectHome
          playerName={playerName}
          onPlayerNameChange={setPlayerName}
          onSelectLevelAndPlay={handleSelectLevelAndPlay}
          onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
          onOpenTrophies={() => setIsTrophiesOpen(true)}
          onOpenLessonPlan={() => setIsLessonPlanOpen(true)}
          isMuted={isMuted}
          isBgmPlaying={isBgmPlaying}
          onToggleMute={handleToggleMute}
          onToggleBgm={handleToggleBgm}
          completedStages={completedStages}
          totalScore={totalScore}
        />
      )}

      {view === 'GAME' && (
        <div className={`flex-1 flex flex-col bg-gradient-to-b ${theme.gradientBg}`}>
          <StageHeader
            currentStage={currentStage}
            difficulty={difficulty}
            totalScore={totalScore}
            totalStars={totalStars}
            playerName={playerName}
            isMuted={isMuted}
            isBgmPlaying={isBgmPlaying}
            onToggleMute={handleToggleMute}
            onToggleBgm={handleToggleBgm}
            onGoHome={handleGoHome}
            onOpenLessonPlan={() => setIsLessonPlanOpen(true)}
            onOpenTrophies={() => setIsTrophiesOpen(true)}
            onChangeDifficulty={setDifficulty}
            onSelectStage={handleSelectStage}
            onGoToChampionship={() => setView('CHAMPIONSHIP')}
          />

          <main className="flex-1 flex flex-col justify-center py-6 px-2 sm:px-4">
            {currentStage === 1 && (
              <Stage1EquipmentMatch
                difficulty={difficulty}
                onStageComplete={handleStageComplete}
              />
            )}
            {currentStage === 2 && (
              <Stage2ActionArena
                difficulty={difficulty}
                onStageComplete={handleStageComplete}
              />
            )}
            {currentStage === 3 && (
              <Stage3GrammarShowdown
                difficulty={difficulty}
                onStageComplete={handleStageComplete}
              />
            )}
            {currentStage === 4 && (
              <Stage4SportsDetective
                difficulty={difficulty}
                onStageComplete={handleStageComplete}
              />
            )}
            {currentStage === 5 && (
              <Stage5GrandChallenge
                difficulty={difficulty}
                onStageComplete={handleStageComplete}
              />
            )}
          </main>
        </div>
      )}

      {view === 'CHAMPIONSHIP' && (
        <ChampionshipScreen
          playerName={playerName}
          difficulty={difficulty}
          scores={scores}
          stars={stars}
          onPlayAgainSameLevel={() => {
            setCurrentStage(1);
            setView('GAME');
          }}
          onGoHome={() => setView('HOME')}
          onOpenCertificate={() => setIsCertificateOpen(true)}
        />
      )}

      {/* Global Modals */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        onStartPlaying={() => {
          setIsHowToPlayOpen(false);
          handleSelectLevelAndPlay(difficulty, 1);
        }}
      />

      <TrophiesModal
        isOpen={isTrophiesOpen}
        onClose={() => setIsTrophiesOpen(false)}
        trophies={trophies}
        scores={scores}
        stars={stars}
        playerName={playerName}
        onOpenCertificate={() => {
          setIsTrophiesOpen(false);
          setIsCertificateOpen(true);
        }}
      />

      <TeacherLessonPlanModal
        isOpen={isLessonPlanOpen}
        onClose={() => setIsLessonPlanOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        playerName={playerName}
        totalScore={totalScore}
        totalStars={totalStars}
        difficulty={difficulty}
      />

      <StageCompleteModal
        isOpen={isStageCompleteOpen}
        stageId={stageCompleteData.stageId}
        scoreEarned={stageCompleteData.score}
        starsEarned={stageCompleteData.stars}
        stageTitle={stageCompleteData.title}
        onNextStage={handleNextStage}
        onReplayStage={handleReplayCurrentStage}
        onOpenTrophies={() => {
          setIsStageCompleteOpen(false);
          setIsTrophiesOpen(true);
        }}
      />

      <AiTutorWidget
        view={view}
        currentStage={currentStage}
        stageTitle={STAGE_NAMES[currentStage]}
        difficulty={difficulty}
        playerName={playerName}
      />
    </div>
  );
}
