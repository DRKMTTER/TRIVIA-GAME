// Temporary mock implementation for development
class Sound {
  constructor(private url: string) {
    if (typeof window !== 'undefined') {
      console.log(`Sound initialized: ${url}`);
    }
  }

  play() {
    if (typeof window !== 'undefined') {
      console.log(`Playing sound: ${this.url}`);
    }
  }
}

export const sounds = {
  correct: new Sound('/sounds/correct.mp3'),
  incorrect: new Sound('/sounds/incorrect.mp3'),
  spin: new Sound('/sounds/spin.mp3'),
  unlock: new Sound('/sounds/unlock.mp3'),
  achievement: new Sound('/sounds/achievement.mp3'),
}; 