import { mockQuiz } from '../../../../__mocks__/quiz';
import { DEFAULT_QUIZ } from '../../../../constants/quiz';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Summary } from './Summary';
import { formatTime } from '../../../../utils/questions/formatTime';
import 'intersection-observer';
import '@testing-library/jest-dom';

describe('Testing summary', () => {
  jest.mock('../../../../__mocks__/quiz', () => ({
    mockQuiz,
  }));
  const mockSetHasStarted = {
    on: jest.fn(),
    off: jest.fn(),
    toggle: jest.fn(),
  };
  const mockSetQuizData = jest.fn();
  mockSetQuizData.mockReturnValue(DEFAULT_QUIZ);

  it('should render component with correct data', () => {
    render(
      <BrowserRouter>
        <Summary
          quiz={mockQuiz}
          setQuizData={mockSetQuizData}
          setHasStarted={mockSetHasStarted}
        />
      </BrowserRouter>,
    );
    const correctAnswers = screen.getByText(
      `Кількість правильних відповідей: ${mockQuiz.correctAnswers}/${mockQuiz.questions.length}`,
    );
    const estimatedTime = screen.getByText(
      `Час проходження: ${formatTime(mockQuiz.timeElapsed)}`,
    );
    expect(correctAnswers).toBeInTheDocument();
    expect(estimatedTime).toBeInTheDocument();
  });
  it('should restart the quiz', () => {
    const wrapper = render(
      <BrowserRouter>
        <Summary
          quiz={mockQuiz}
          setQuizData={mockSetQuizData}
          setHasStarted={mockSetHasStarted}
        />
      </BrowserRouter>,
    );
    fireEvent.click(wrapper.getByText('Пройти ще раз'));
    expect(mockSetHasStarted.on).toHaveBeenCalled();
    expect(mockSetQuizData).toHaveBeenCalled();
  });
});
