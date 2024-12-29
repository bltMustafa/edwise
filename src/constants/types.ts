export interface Word {
  english: string;
  turkish: string;
}


export interface WordSet {
  id: string;
  name: string;
  words: Word[];
}


export interface GameState {
  currentWordIndex: number;
  userGuess: string;
  results: {word: Word; correct: boolean}[];
  shuffledWords: WordSet['words']; 
}
