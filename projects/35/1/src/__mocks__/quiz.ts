import { IQuestion, IQuiz } from '../@types/questions';

export const mockQuestions: IQuestion[] = [
  {
    text: 'Яка пам’ятка архітектури, що знаходиться у Полтаві є єдиним на пострадянському просторі композиційно завершеним архітектурним ансамблем доби губернського класицизму?',
    options: [
      'Будинок А.П. Білецького',
      'Спасо-Преображенський кафедральний собор',
      'Кругла площа',
      'Будинок офіцерів',
    ],
    interestingFacts: {
      success:
        'Саме так! До речі, наш коледж знаходиться в історичному серці міста, на відстані кількох хвилин пішої ходи від історичної Круглої площі, яка є однією з найбільш значущих пам’яток Полтави.',
      error:
        'На жаль, це не так. Але вступивши до коледжу, ви завжди зможете насолодитися відпочинком у корпусному парку, що знаходиться в самому центрі Круглої площі. Але тільки після занять!',
    },
    answer: 'Кругла площа',
    correctAnswer: 'Кругла площа',
    backgroundPicture: '/images/questions/q6.jpg',
    hexPalette: '647C2F',
  },
];

export const mockQuiz: IQuiz = {
  questions: mockQuestions,
  timeElapsed: 10,
  isFinished: true,
  correctAnswers: 1,
  questionsAnswered: 1,
  currentQuestion: null,
};
