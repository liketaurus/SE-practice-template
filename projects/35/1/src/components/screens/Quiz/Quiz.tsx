import { FC, useContext, useEffect, useState } from 'react';
import { Box, Flex, useBoolean } from '@chakra-ui/react';
import { IQuiz } from '../../../@types/questions';
import { QuestionsService } from '../../../services/QuestionsService';
import { takeRandomElements } from '../../../utils/questions/takeRandomElements';
import { Introduction } from './Introduction/Introduction';
import { Summary } from './Summary/Summary';
import { Questions } from './Questions/Questions';
import { ColorContext } from '../../context/ColorContext';
import {
  BASE_LINK,
  DEFAULT_QUIZ,
  QUESTIONS_LIMIT,
  SUMMARY_COLOR,
} from '../../../constants/quiz';
import { AnimatePresence } from 'framer-motion';

export const Quiz: FC = () => {
  const { setColor } = useContext(ColorContext);
  const [hasStarted, setHasStarted] = useBoolean(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizData, setQuizData] = useState<IQuiz>(DEFAULT_QUIZ);

  const takeCurrentImage = () => {
    if (!hasStarted) return `${BASE_LINK}/images/introduction.png`;
    if (quizData.isFinished) return `${BASE_LINK}/images/summary.png`;
    return `${BASE_LINK}${quizData.currentQuestion?.backgroundPicture}`;
  };

  useEffect(() => {
    if (hasStarted) {
      QuestionsService.getAllQuestions().then((questions) => {
        const randomizedQuestions = takeRandomElements(
          questions,
          QUESTIONS_LIMIT,
        );
        setQuizData((prev) => ({
          ...prev,
          questions: randomizedQuestions,
          currentQuestion: randomizedQuestions[0],
        }));
      });
    }
  }, [hasStarted, quizData.isFinished]);

  useEffect(() => {
    let timer = 0;
    if (hasStarted && !quizData.isFinished) {
      setTimeElapsed(0);
      // @ts-ignore
      timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    } else if (quizData.isFinished) {
      clearInterval(timer);
      setQuizData((prev) => ({ ...prev, timeElapsed }));
    }

    return () => clearInterval(timer);
  }, [hasStarted, quizData.isFinished]);

  useEffect(() => {
    if (hasStarted && !quizData.isFinished)
      setColor(quizData.currentQuestion?.hexPalette || '#aaaaaa');
    if (quizData.isFinished) setColor(SUMMARY_COLOR);
  }, [quizData.currentQuestion, hasStarted, quizData.isFinished]);

  return (
    <Box
      minHeight="100vh"
      backgroundImage={takeCurrentImage()}
      backgroundSize="cover"
      backgroundPosition="center">
      <Flex
        flexDirection="column"
        alignItems="cnter"
        justifyContent="center"
        backdropFilter="auto"
        backdropBlur="9px"
        backdropBrightness="70%"
        minHeight="100vh"
        w="100%"
        py={{ base: '120px', md: 0 }}>
        <AnimatePresence>
          {quizData.isFinished ? (
            <Summary
              quiz={quizData}
              setQuizData={setQuizData}
              setHasStarted={setHasStarted}></Summary>
          ) : !hasStarted ? (
            <Introduction startQuiz={setHasStarted.on}></Introduction>
          ) : quizData.questions.length > 0 && quizData.currentQuestion ? (
            <Questions
              quizData={quizData}
              setQuizData={setQuizData}></Questions>
          ) : null}
        </AnimatePresence>
      </Flex>
    </Box>
  );
};
