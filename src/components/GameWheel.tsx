'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, Question } from '@/lib/types';
import { getRandomQuestions, getQuestionsByCategory } from '@/lib/questions';
import { sounds } from '@/lib/utils/sounds';
import { useGame } from '@/lib/contexts/GameContext';
import QuestionCard from './QuestionCard';

const categories: Category[] = [
  { id: 'science', name: 'Science & Nature', color: '#FF6B6B', icon: '🔬' },
  { id: 'history', name: 'History & Geography', color: '#4ECDC4', icon: '🌍' },
  { id: 'math', name: 'Math & Logic', color: '#45B7D1', icon: '🔢' },
  { id: 'arts', name: 'Arts & Literature', color: '#96CEB4', icon: '🎨' },
  { id: 'facts', name: 'Fun Facts', color: '#FFEEAD', icon: '⭐' },
  { id: 'sports', name: 'Sports & Games', color: '#D4A5A5', icon: '⚽' },
];

export default function GameWheel() {
  const { 
    difficulty, 
    setDifficulty, 
    updateScore, 
    unlockCharacter,
    answeredQuestions,
    markQuestionAnswered,
    resetCategoryProgress,
    hasAnsweredAllQuestions,
    getAvailableQuestions
  } = useGame();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const getUnansweredQuestion = (categoryId: string): Question | null => {
    const key = `${categoryId}-${difficulty}`;
    const answeredSet = answeredQuestions[key] || new Set();
    
    // Get all questions for this category and difficulty
    const questions = getQuestionsByCategory(categoryId, difficulty);
    
    // Filter out answered questions
    const unansweredQuestions = questions.filter(q => !answeredSet.has(q.id));
    
    // If no unanswered questions remain
    if (unansweredQuestions.length === 0) {
      setShowCompletionMessage(true);
      return null;
    }
    
    // Return a random unanswered question
    return unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
  };

  const handleCategoryClick = (categoryId: string) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedCategory(categoryId);
    setShowCompletionMessage(false);
    sounds.spin.play();
    
    // Get a random unanswered question
    const question = getUnansweredQuestion(categoryId);
    
    // Simulate wheel spinning
    setTimeout(() => {
      setIsSpinning(false);
      if (question) {
        setCurrentQuestion(question);
      }
    }, 1000);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (currentQuestion) {
      updateScore(isCorrect, currentQuestion.category);
      if (isCorrect) {
        unlockCharacter(currentQuestion.category);
        // Mark the question as answered only if correct
        markQuestionAnswered(currentQuestion.id, currentQuestion.category, difficulty);
      }
    }
    setTimeout(() => {
      setSelectedCategory(null);
      setCurrentQuestion(null);
      setShowCompletionMessage(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Difficulty Selector */}
      <div className="flex justify-center gap-4 mb-6">
        {(['easy', 'medium', 'hard'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              difficulty === level
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Game Wheel */}
      <div className="relative w-full max-w-4xl mx-auto">
        <AnimatePresence>
          {!currentQuestion ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => {
                const progress = getAvailableQuestions(category.id, difficulty);
                return (
                  <motion.div
                    key={category.id}
                    className={`aspect-square cursor-pointer ${
                      selectedCategory === category.id ? 'ring-4 ring-yellow-400' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div
                      className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transition-transform"
                      style={{ backgroundColor: category.color }}
                    >
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <div className="text-lg font-bold text-white text-center">
                        {category.name}
                      </div>
                      <div className="mt-2 text-sm text-white text-center">
                        {progress.answered} / {progress.total}
                      </div>
                      {hasAnsweredAllQuestions(category.id, difficulty) && (
                        <div className="mt-2 text-sm text-white bg-black bg-opacity-20 px-2 py-1 rounded">
                          All Complete! ⭐
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
          )}
        </AnimatePresence>

        {/* Completion Message */}
        {showCompletionMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md mx-4 text-center"
            >
              <h3 className="text-xl font-bold mb-4">Category Completed! 🎉</h3>
              <p className="text-gray-600 mb-4">
                You&apos;ve answered all questions in this category for the {difficulty} difficulty level.
                Try another category or change the difficulty level!
              </p>
              <button
                onClick={() => setShowCompletionMessage(false)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Got it!
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 