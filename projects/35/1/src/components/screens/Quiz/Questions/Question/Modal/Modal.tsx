import { FC, useContext, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { IQuestion } from '../../../../../../@types/questions';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  ERROR_COLOR,
  ERROR_EMOJI,
  MODAL_TIMEOUT,
  motionDefaults,
  SUCCESS_COLOR,
  SUCCESS_EMOJI,
} from '../../../../../../constants/quiz';
import { hexToRGB } from '../../../../../../utils/color/hexToRGB';
import { ColorContext } from '../../../../../context/ColorContext';
import { AnimatePresence, motion } from 'framer-motion';

type TProps = {
  question: IQuestion;
  isAnswerCorrect: boolean;
  setNextQuestion: () => void;
};

const ChakraCard = motion(Card);
const ChakraBox = motion(Box);

export const Modal: FC<TProps> = ({
  setNextQuestion,
  question: { interestingFacts },
  isAnswerCorrect,
}) => {
  const { color, setColor } = useContext(ColorContext);
  const [timeLeft, setTimeLeft] = useState(MODAL_TIMEOUT);
  const factKey = isAnswerCorrect ? 'success' : 'error';
  const emoji = useMemo(
    () =>
      isAnswerCorrect
        ? SUCCESS_EMOJI[Math.floor(Math.random() * SUCCESS_EMOJI.length)]
        : ERROR_EMOJI[Math.floor(Math.random() * ERROR_EMOJI.length)],
    [isAnswerCorrect],
  );

  useEffect(() => {
    isAnswerCorrect ? setColor(SUCCESS_COLOR) : setColor(ERROR_COLOR);
    const innerTimer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(innerTimer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) setNextQuestion();
  }, [timeLeft, setNextQuestion]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxW={'3xl'}
      m="0 auto"
      h="full">
      <ChakraCard
        backgroundColor={`rgba(${hexToRGB(
          color,
          'values-only',
        ).toString()}, 0.8)`}
        color="white"
        borderRadius="25px"
        px={{ base: 1 }}
        mx={3}>
        <AnimatePresence mode="wait">
          <ChakraBox
            key={interestingFacts.success}
            {...motionDefaults}>
            <CardHeader px={{ base: 0, sm: 3 }}>
              <Flex
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center">
                <CircularProgress
                  max={MODAL_TIMEOUT}
                  value={timeLeft}
                  size="70px"
                  trackColor="transparent"
                  color="white"
                  thickness="7px">
                  <CircularProgressLabel>{timeLeft}</CircularProgressLabel>
                </CircularProgress>
                <Heading
                  textAlign="center"
                  my={{ base: 3, sm: 0 }}>
                  {isAnswerCorrect
                    ? 'Правильна відповідь!'
                    : 'Неправильна відповідь!'}
                  {emoji}
                </Heading>
                <IconButton
                  aria-label="Go to the next question"
                  onClick={setNextQuestion}
                  icon={
                    <ArrowForwardIcon
                      w={8}
                      h={8}
                    />
                  }
                  backgroundColor="transparent"
                  _hover={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}></IconButton>
              </Flex>
            </CardHeader>

            <CardBody
              display="flex"
              justifyContent="center"
              alignItems="center"
              h="full"
              py={{ base: 15, sm: 20 }}>
              <Text
                fontWeight="bold"
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>
                {interestingFacts[factKey]}
              </Text>
            </CardBody>
          </ChakraBox>
        </AnimatePresence>
      </ChakraCard>
    </Flex>
  );
};
