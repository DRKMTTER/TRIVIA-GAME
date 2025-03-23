'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameProgress, Character } from '@/lib/types';
import { characters } from '@/lib/characters';
import { achievements, Achievement } from '@/lib/achievements';
import { sounds } from '@/lib/utils/sounds';
import { getQuestionsByCategory } from '@/lib/questions';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameContextType {
  score: number;
  streak: number;
  characters: Character[];
  achievements: Achievement[];
  categoryProgress: { [key: string]: number };
  difficulty: Difficulty;
  answeredQuestions: { [key: string]: Set<string> }; // Track answered questions by category and difficulty
  setDifficulty: (difficulty: Difficulty) => void;
  updateScore: (correct: boolean, category: string) => void;
  unlockCharacter: (categoryId: string) => void;
  resetProgress: () => void;
  markQuestionAnswered: (questionId: string, category: string, difficulty: string) => void;
  resetCategoryProgress: (category: string, difficulty: string) => void;
  hasAnsweredAllQuestions: (category: string, difficulty: string) => boolean;
  getAvailableQuestions: (category: string, difficulty: string) => { answered: number; total: number };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameCharacters, setGameCharacters] = useState(characters);
  const [gameAchievements, setGameAchievements] = useState(achievements);
  const [categoryProgress, setCategoryProgress] = useState<{ [key: string]: number }>({});
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: string]: Set<string> }>({});

  // Helper function to get the key for storing answered questions
  const getAnsweredQuestionsKey = (category: string, difficulty: string) => `${category}-${difficulty}`;

  const markQuestionAnswered = (questionId: string, category: string, difficulty: string) => {
    const key = getAnsweredQuestionsKey(category, difficulty);
    setAnsweredQuestions(prev => {
      const newAnswered = { ...prev };
      if (!newAnswered[key]) {
        newAnswered[key] = new Set();
      }
      newAnswered[key].add(questionId);
      return newAnswered;
    });
  };

  const resetCategoryProgress = (category: string, difficulty: string) => {
    const key = getAnsweredQuestionsKey(category, difficulty);
    setAnsweredQuestions(prev => {
      const newAnswered = { ...prev };
      delete newAnswered[key];
      return newAnswered;
    });
  };

  const hasAnsweredAllQuestions = (category: string, difficulty: string) => {
    const key = getAnsweredQuestionsKey(category, difficulty);
    const answeredCount = answeredQuestions[key]?.size || 0;
    const questions = getQuestionsByCategory(category, difficulty as Difficulty);
    return answeredCount >= questions.length;
  };

  const getAvailableQuestions = (category: string, difficulty: string) => {
    const key = getAnsweredQuestionsKey(category, difficulty);
    const answeredCount = answeredQuestions[key]?.size || 0;
    const questions = getQuestionsByCategory(category, difficulty as Difficulty);
    return {
      answered: answeredCount,
      total: questions.length
    };
  };

  const checkAchievements = (correct: boolean, category: string) => {
    const newAchievements = [...gameAchievements];
    let achievementUnlocked = false;
    
    if (correct) {
      // Check score achievements
      newAchievements.forEach(achievement => {
        if (!achievement.isUnlocked) {
          if (achievement.requirement.type === 'score' && score >= achievement.requirement.value) {
            achievement.isUnlocked = true;
            achievementUnlocked = true;
          }
          if (achievement.requirement.type === 'streak' && streak >= achievement.requirement.value) {
            achievement.isUnlocked = true;
            achievementUnlocked = true;
          }
          if (achievement.requirement.type === 'category' && 
              achievement.requirement.category === category &&
              categoryProgress[category] >= achievement.requirement.value) {
            achievement.isUnlocked = true;
            achievementUnlocked = true;
          }
        }
      });
    }

    if (achievementUnlocked) {
      sounds.achievement.play();
    }

    setGameAchievements(newAchievements);
  };

  const updateScore = (correct: boolean, category: string) => {
    if (correct) {
      const points = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setCategoryProgress(prev => ({
        ...prev,
        [category]: (prev[category] || 0) + 1
      }));
      sounds.correct.play();
    } else {
      setStreak(0);
      sounds.incorrect.play();
    }

    checkAchievements(correct, category);
  };

  const unlockCharacter = (categoryId: string) => {
    const newCharacters = gameCharacters.map(char => {
      if (char.category === categoryId && !char.isUnlocked) {
        return { ...char, isUnlocked: true };
      }
      return char;
    });

    setGameCharacters(newCharacters);
    sounds.unlock.play();
    checkAchievements(true, categoryId);
  };

  const resetProgress = () => {
    setScore(0);
    setStreak(0);
    setCategoryProgress({});
    setGameCharacters(characters);
    setGameAchievements(achievements);
    setDifficulty('easy');
    setAnsweredQuestions({});
  };

  return (
    <GameContext.Provider
      value={{
        score,
        streak,
        characters: gameCharacters,
        achievements: gameAchievements,
        categoryProgress,
        difficulty,
        answeredQuestions,
        setDifficulty,
        updateScore,
        unlockCharacter,
        resetProgress,
        markQuestionAnswered,
        resetCategoryProgress,
        hasAnsweredAllQuestions,
        getAvailableQuestions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 