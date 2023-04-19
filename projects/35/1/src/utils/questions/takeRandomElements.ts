import { QUESTIONS_LIMIT } from '../../constants/quiz';

export const takeRandomElements = (
  elements: any[],
  limit = QUESTIONS_LIMIT,
) => {
  if (limit > elements.length) limit = elements.length;
  const shuffledElements = [...elements];
  for (let i = shuffledElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledElements[i], shuffledElements[j]] = [
      shuffledElements[j],
      shuffledElements[i],
    ];
  }
  return shuffledElements.slice(0, limit);
};
