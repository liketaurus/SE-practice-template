import { FC } from 'react';
import { IQuestion, IQuiz } from '../../../../@types/questions';
import { Question } from './Question/Question';

type TProps = {
  quizData: IQuiz;
  setQuizData: (quiz: IQuiz) => void;
};

export const Questions: FC<TProps> = ({ quizData, setQuizData }) => {
  const setNextQuestion = (answer: string) => {
    const currentQuestion: IQuestion = { ...quizData.currentQuestion!, answer };
    const currentQuestionId = quizData.questions.findIndex(
      (question) => question.text === currentQuestion.text,
    );
    const correctAnswers =
      currentQuestion.correctAnswer === answer
        ? quizData.correctAnswers + 1
        : quizData.correctAnswers;
    const isFinished = currentQuestionId === quizData.questions.length - 1;
    const nextQuestion = isFinished
      ? null
      : quizData.questions.find((_, i) => i === currentQuestionId + 1)!;

    setQuizData({
      ...quizData,
      currentQuestion: nextQuestion,
      questionsAnswered: quizData.questionsAnswered + 1,
      correctAnswers,
      isFinished,
    });
  };

  return (
    <Question
      question={quizData.currentQuestion!}
      handleAnswer={setNextQuestion}
      answeredQuestions={quizData.questionsAnswered}
      totalQuestions={quizData.questions.length}
    />
  );
};
