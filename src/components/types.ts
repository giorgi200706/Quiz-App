export interface QuestionLayoutProps {
  score: number;
  currentQuestionIndex: number;
  currentQuestion: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  currentAnswers: string[];
  selectedAnswer: string | null;
  handleAnswerSelect: (answer: string) => void;
  onHomePressHandler: () => void;
  onRestartPressHandler: () => void;
}

export interface MainLayoutProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string | null>>;
  categoryOptions: { label: string; value: string }[];
  difficultyOptions: { label: string; value: string }[];
  onStartPressHandler: () => void;
}
