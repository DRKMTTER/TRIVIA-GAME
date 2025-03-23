'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/lib/contexts/GameContext';

export default function PlayerProgress() {
  const { score, streak, characters, achievements, categoryProgress } = useGame();

  const categoryNames: { [key: string]: string } = {
    science: 'Science & Nature',
    history: 'History & Geography',
    math: 'Math & Logic',
    arts: 'Arts & Literature',
    facts: 'Fun Facts',
    sports: 'Sports & Games',
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stats */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Your Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
              <span className="font-medium">Total Score</span>
              <span className="text-2xl font-bold text-blue-600">{score}</span>
            </div>
            <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
              <span className="font-medium">Current Streak</span>
              <span className="text-2xl font-bold text-green-600">{streak}</span>
            </div>
          </div>

          {/* Category Progress */}
          <h3 className="text-xl font-bold text-purple-800 mt-6 mb-4">Category Progress</h3>
          <div className="space-y-3">
            {Object.entries(categoryNames).map(([categoryId, categoryName]) => (
              <div key={categoryId} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{categoryName}</span>
                  <span className="text-sm text-gray-600">
                    {categoryProgress[categoryId] || 0} correct
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        ((categoryProgress[categoryId] || 0) / 5) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Characters and Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Characters</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {characters.map((char) => (
              <motion.div
                key={char.id}
                className={`p-4 rounded-xl text-center ${
                  char.isUnlocked ? 'bg-yellow-100' : 'bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-2">{char.image}</div>
                <div className="text-sm font-medium">
                  {char.isUnlocked ? char.name : '???'}
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-purple-800 mb-4">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-xl ${
                  achievement.isUnlocked ? 'bg-green-100' : 'bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-gray-600">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 