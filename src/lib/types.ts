export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  funFact?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type Character = {
  id: string;
  name: string;
  category: string;
  image: string;
  isUnlocked: boolean;
};

export type GameProgress = {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  unlockedCharacters: string[];
  categoryProgress: {
    [key: string]: number;
  };
};

export type Player = {
  id: string;
  name: string;
  avatar: string;
  progress: GameProgress;
  characters: Character[];
}; 