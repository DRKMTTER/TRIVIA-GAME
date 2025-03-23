export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: {
    type: 'score' | 'streak' | 'category' | 'character';
    value: number;
    category?: string;
  };
  isUnlocked: boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first-correct',
    name: 'First Steps',
    description: 'Answer your first question correctly',
    icon: '🌟',
    requirement: {
      type: 'score',
      value: 1,
    },
    isUnlocked: false,
  },
  {
    id: 'streak-3',
    name: 'On Fire!',
    description: 'Get 3 correct answers in a row',
    icon: '🔥',
    requirement: {
      type: 'streak',
      value: 3,
    },
    isUnlocked: false,
  },
  {
    id: 'science-master',
    name: 'Science Whiz',
    description: 'Answer 5 science questions correctly',
    icon: '🔬',
    requirement: {
      type: 'category',
      value: 5,
      category: 'science',
    },
    isUnlocked: false,
  },
  {
    id: 'history-master',
    name: 'History Buff',
    description: 'Answer 5 history questions correctly',
    icon: '🌍',
    requirement: {
      type: 'category',
      value: 5,
      category: 'history',
    },
    isUnlocked: false,
  },
  {
    id: 'math-master',
    name: 'Math Genius',
    description: 'Answer 5 math questions correctly',
    icon: '🔢',
    requirement: {
      type: 'category',
      value: 5,
      category: 'math',
    },
    isUnlocked: false,
  },
  {
    id: 'collector',
    name: 'Character Collector',
    description: 'Unlock 3 characters',
    icon: '👥',
    requirement: {
      type: 'character',
      value: 3,
    },
    isUnlocked: false,
  },
  {
    id: 'master-collector',
    name: 'Master Collector',
    description: 'Unlock all characters',
    icon: '👑',
    requirement: {
      type: 'character',
      value: 6,
    },
    isUnlocked: false,
  },
]; 