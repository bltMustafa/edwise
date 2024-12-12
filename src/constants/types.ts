export interface Word {
  english: string;
  turkish: string;
}


export interface WordSet {
  id: string;
  name: string;
  words: Word[];
  difficulty: "easy" | "medium" | "hard";
}


export interface GameState {
  currentWordIndex: number;
  userGuess: string;
  results: {word: Word; correct: boolean}[];
}
