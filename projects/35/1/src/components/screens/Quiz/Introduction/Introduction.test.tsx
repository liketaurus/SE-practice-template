import { fireEvent, render } from '@testing-library/react';
import { Introduction } from './Introduction';
import 'intersection-observer';

describe('Testing introduction', () => {
  it('should render component with correct data', () => {
    const { getByRole } = render(<Introduction startQuiz={() => {}} />);
    const mainHeading = getByRole('heading', { level: 1 });
    const secondaryHeading = getByRole('heading', { level: 2 });
    const startBtn = getByRole('button');
    expect(mainHeading.textContent).toBe('Вікторина - Коледж та Полтавщина');
    expect(secondaryHeading.textContent).toBe(
      'Ласкаво просимо до нашої вікторини!',
    );
    expect(startBtn.textContent).toBe('Розпочати');
  });
  it('should start the quiz', () => {
    const mockStartQuiz = jest.fn();
    const wrapper = render(<Introduction startQuiz={mockStartQuiz} />);
    fireEvent.click(wrapper.getByRole('button'));
    expect(mockStartQuiz).toHaveBeenCalled();
  });
});
