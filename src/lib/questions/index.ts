import { Question } from '../types';
import { scienceQuestions } from './scienceQuestions';
import { historyQuestions } from './historyQuestions';
import { mathQuestions } from './mathQuestions';
import { artsQuestions } from './artsQuestions';
import { factsQuestions } from './factsQuestions';
import { sportsQuestions } from './sportsQuestions';

// Combine all questions into one array
export const allQuestions: Question[] = [
  ...scienceQuestions,
  ...historyQuestions,
  ...mathQuestions,
  ...artsQuestions,
  ...factsQuestions,
  ...sportsQuestions,
];

// Helper function to get questions by category and difficulty
export const getQuestionsByCategory = (category: string, difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return allQuestions.filter(q => q.category === category && q.difficulty === difficulty);
};

// Helper function to get random questions
export const getRandomQuestions = (category: string, difficulty: 'easy' | 'medium' | 'hard', count: number): Question[] => {
  const questions = getQuestionsByCategory(category, difficulty);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}; 