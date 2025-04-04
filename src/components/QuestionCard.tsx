'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle options only when the question changes
  useEffect(() => {
    setShuffledOptions(shuffleArray(question.options));
    setSelectedAnswer(null);
    setShowResult(false);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto"
    >
      <div className="text-2xl font-bold text-purple-800 mb-6 text-center">
        {question.question}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswerClick(option)}
            className={`p-4 rounded-xl text-lg font-medium transition-colors
              ${
                !selectedAnswer
                  ? 'bg-blue-100 hover:bg-blue-200'
                  : selectedAnswer === option
                  ? option === question.correctAnswer
                    ? 'bg-green-200'
                    : 'bg-red-200'
                  : option === question.correctAnswer && showResult
                  ? 'bg-green-200'
                  : 'bg-blue-100'
              }
            `}
            disabled={!!selectedAnswer}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div
            className={`text-lg font-bold ${
              selectedAnswer === question.correctAnswer
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {selectedAnswer === question.correctAnswer
              ? '🎉 Correct!'
              : '😅 Not quite right!'}
          </div>
          {question.explanation && (
            <div className="mt-2 text-gray-600">{question.explanation}</div>
          )}
          {selectedAnswer === question.correctAnswer && question.funFact && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-800 font-semibold mb-2">Fun Fact!</div>
              <div className="text-gray-700">{question.funFact}</div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
} 