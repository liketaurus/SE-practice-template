import { FC, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import { IQuiz } from '../../../../@types/questions';
import { formatTime } from '../../../../utils/questions/formatTime';
import { hexToRGB } from '../../../../utils/color/hexToRGB';
import { ColorContext } from '../../../context/ColorContext';
import {
  DEFAULT_HOVER_COLOR,
  DEFAULT_QUIZ,
  motionDefaults,
} from '../../../../constants/quiz';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

type TProps = {
  quiz: IQuiz;
  setQuizData: (quiz: IQuiz) => void;
  setHasStarted: { on: () => void; off: () => void; toggle: () => void };
};

const ChakraCard = motion(Card);

export const Summary: FC<TProps> = ({ quiz, setQuizData, setHasStarted }) => {
  const { color } = useContext(ColorContext);

  const handleClick = (fullQuizReset: boolean) => {
    if (fullQuizReset) {
      setQuizData(DEFAULT_QUIZ);
      setHasStarted.off();
      return;
    }
    setQuizData({ ...DEFAULT_QUIZ, questions: quiz.questions });
    setHasStarted.on();
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxW={'3xl'}
      m="0 auto"
      h="100%">
      <AnimatePresence>
        <ChakraCard
          {...motionDefaults}
          backgroundColor={`rgba(${hexToRGB(
            color,
            'values-only',
          ).toString()}, 1)`}
          color="white"
          borderRadius="25px"
          mx={3}
          px={{ base: 0, md: 5 }}
          py={{ base: 0, md: 6 }}>
          <CardHeader px={{ base: 0, sm: 3 }}>
            <Heading>
              <Flex
                alignItems="center"
                justifyContent="space-between">
                <Box
                  style={{
                    transform: 'scale(-1, 1)',
                    whiteSpace: 'nowrap',
                  }}
                  display={{ base: 'none', md: 'block' }}>
                  🎉🎉🎉
                </Box>
                <Text
                  m="0 auto"
                  fontSize={{ base: '2xl', md: '3xl' }}>
                  Вікторину завершено!
                </Text>

                <Box
                  display={{ base: 'none', md: 'block' }}
                  style={{ whiteSpace: 'nowrap' }}>
                  🎉🎉🎉
                </Box>
              </Flex>
            </Heading>
          </CardHeader>

          <CardBody
            py={{ base: 0, sm: 3 }}
            px={{ base: 0, sm: 3 }}>
            <Flex
              flexDirection="column"
              w={{ base: '90%', md: '100%' }}
              m="0 auto">
              <Flex
                fontWeight="bold"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ base: 'column', md: 'row' }}>
                <Box
                  px={3}
                  py={5}
                  w="full"
                  mx={1}
                  bgColor="rgba(0, 0, 0, 0.3)"
                  borderRadius="10px">
                  <Text textAlign="center">
                    Кількість правильних відповідей: {quiz.correctAnswers}/
                    {quiz.questions.length}
                  </Text>
                </Box>
                <Box
                  px={3}
                  py={5}
                  mt={{ base: 2, md: 0 }}
                  w="full"
                  mx={1}
                  bgColor="rgba(0, 0, 0, 0.3)"
                  borderRadius="10px">
                  <Text textAlign="center">
                    Час проходження: {formatTime(quiz.timeElapsed)}
                  </Text>
                </Box>
              </Flex>
              <Text
                fontSize={{ base: 'md' }}
                fontWeight="bold"
                mt={4}>
                Дякуємо вам за участь в нашій вікторині! Ми сподіваємось, що ви
                отримали задоволення від гри та дізналися багато цікавого про
                наш освітній заклад. <br />
                <br /> Навчаючись в нашому коледжі ви отримаєте багато
                можливостей для розвитку та кар’єрного зростання. Якщо ви
                зацікавилися розробкою програмного забезпечення, ми запрошуємо
                вас до нашого сайту аби дізнатися більше про наш освітній
                заклад, його спеціальності, насичене студентське життя та новини
                коледжу. <br />
                <br />
                Якщо ж ви не отримали максимальної кількості балів чи
                незадоволені своїм результатом - не засмучуйтесь! Ви можете
                спробувати пройти вікторину ще раз та покращити свій результат.
                Бажаємо вам успіхів та нехай ваші мрії про престижну професію та
                успішну кар’єру збудуться!
              </Text>
            </Flex>
          </CardBody>
          <CardFooter px={{ base: 0, sm: 3 }}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              flexDirection={{ base: 'column', md: 'row' }}>
              {['Пройти ще раз', 'Повернутись на початок'].map((text, i) => (
                <Link
                  key={text}
                  w={{ base: '90%', md: '100%' }}
                  mx={1}
                  href="/"
                  as={RouterLink}
                  onClick={() => handleClick(i === 1)}
                  style={{ textDecoration: 'none' }}
                  mb={{ base: 2, md: 0 }}>
                  <Button
                    w="100%"
                    py={3}
                    size={{ base: 'md', md: 'xl' }}
                    fontSize="xl"
                    backgroundColor="#79848F"
                    _hover={{
                      backgroundColor: `${DEFAULT_HOVER_COLOR}`,
                      color: `${hexToRGB(color, 'full')}`,
                    }}>
                    {text}
                  </Button>
                </Link>
              ))}
            </Flex>
          </CardFooter>
        </ChakraCard>
      </AnimatePresence>
    </Flex>
  );
};
