export interface IQuiz {
  questions: IQuestion[];
  currentQuestion: IQuestion | null;
  questionsAnswered: number;
  correctAnswers: number;
  isFinished: boolean;
  timeElapsed: number;
}

export interface IQuestion {
  text: string;
  options: string[];
  answer: string | null;
  correctAnswer: string;
  interestingFacts: {
    success: string;
    error: string;
  };
  backgroundPicture: string;
  hexPalette: string;
}
