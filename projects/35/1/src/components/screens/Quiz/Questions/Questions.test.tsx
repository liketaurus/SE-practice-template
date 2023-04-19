import { mockQuestions } from '../../../../__mocks__/quiz';
import { render, screen } from '@testing-library/react';
import { Question } from './Question/Question';
import { BrowserRouter } from 'react-router-dom';
import 'intersection-observer';
import '@testing-library/jest-dom';

describe('Testing question', () => {
  jest.mock('../../../../__mocks__/quiz', () => ({
    mockQuestions,
  }));
  const mockHandleAnswer = jest.fn();

  it('should render component with correct data', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Question
          answeredQuestions={1}
          question={mockQuestions[0]}
          totalQuestions={3}
          handleAnswer={mockHandleAnswer}
        />
      </BrowserRouter>,
    );
    const questionTitle = screen.getByTestId('questionTitle');
    expect(questionTitle.textContent).toBe(mockQuestions[0].text);
  });
});
