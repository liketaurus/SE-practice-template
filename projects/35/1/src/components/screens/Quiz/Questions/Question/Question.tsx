import { FC, useContext, useMemo, useState } from 'react';
import { IQuestion } from '../../../../../@types/questions';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  List,
  ListItem,
  Progress,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { Modal } from './Modal/Modal';
import { ColorContext } from '../../../../context/ColorContext';
import { hexToRGB } from '../../../../../utils/color/hexToRGB';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { takeRandomElements } from '../../../../../utils/questions/takeRandomElements';
import { AnimatePresence, motion } from 'framer-motion';
import { motionDefaults } from '../../../../../constants/quiz';

type TProps = {
  question: IQuestion;
  handleAnswer: (answer: string) => void;
  answeredQuestions: number;
  totalQuestions: number;
};

const ChakraCard = motion(Card);
const ChakraBox = motion(Box);

export const Question: FC<TProps> = ({
  question,
  handleAnswer,
  totalQuestions,
  answeredQuestions,
}) => {
  const [answer, setAnswer] = useState('');
  const [showModal, setShowModal] = useBoolean(false);
  const { color } = useContext(ColorContext);

  const randomizedOptions = useMemo(
    () =>
      takeRandomElements(question.options, question.options.length) as string[],
    [question],
  );

  return (
    <>
      {showModal ? (
        <Modal
          setNextQuestion={() => {
            setShowModal.off();
            handleAnswer(answer);
          }}
          question={question}
          isAnswerCorrect={question.correctAnswer === answer}
        />
      ) : (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW={'3xl'}
          w="full"
          px={3}
          m="0 auto"
          h="full">
          <ChakraCard
            width="100%"
            backgroundColor={`rgba(${hexToRGB(
              color,
              'values-only',
            ).toString()}, 0.8)`}
            color="white"
            borderRadius="25px">
            <AnimatePresence mode="wait">
              <ChakraBox
                key={question.text}
                {...motionDefaults}>
                <CardHeader>
                  <Flex
                    justifyContent="center"
                    alignItems="center">
                    <QuestionOutlineIcon
                      w={8}
                      h={8}
                      mr={2}
                    />{' '}
                    <Text
                      data-testid="questionTitle"
                      fontSize={{ base: 'md', sm: 'lg' }}
                      fontWeight="bold"
                      align="center">
                      {question.text}
                    </Text>
                  </Flex>
                </CardHeader>
                <Flex
                  justifyContent="center"
                  alignItems="center">
                  <Progress
                    value={(answeredQuestions / totalQuestions) * 100}
                    w="75%"
                    size="xs"
                    colorScheme="green"
                    borderRadius="15px"
                    mr={2}
                  />
                  <Text fontWeight="bold">
                    {answeredQuestions}/{totalQuestions}
                  </Text>
                </Flex>
                <CardBody height="max-content">
                  <List spacing={3}>
                    {randomizedOptions.map((option, index) => (
                      <ListItem
                        key={option}
                        onClick={() => {
                          setAnswer(option);
                          setShowModal.on();
                        }}
                        cursor="pointer">
                        <Flex
                          alignItems="center"
                          px={3}
                          py={4}
                          my={4}
                          borderWidth="3px"
                          borderColor="white"
                          borderRadius="15px"
                          backgroundColor="rgba(0, 0, 0, 0.5)"
                          _hover={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          }}>
                          <Box
                            borderRadius="5px"
                            backgroundColor={`rgba(${hexToRGB(
                              color,
                              'values-only',
                            ).toString()}, 0.8)`}
                            width="25px">
                            <Text textAlign="center">{index + 1}</Text>
                          </Box>
                          <Text
                            mx="auto"
                            textAlign="center"
                            w="max-content"
                            fontSize={{ base: 'sm', sm: 'md' }}
                            fontWeight="bold">
                            {option}
                          </Text>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </CardBody>
              </ChakraBox>
            </AnimatePresence>
          </ChakraCard>
        </Flex>
      )}
    </>
  );
};
