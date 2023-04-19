import { IQuestion } from '../@types/questions';
import { BASE_LINK } from '../constants/quiz';

export class QuestionsService {
  public static async getAllQuestions(): Promise<IQuestion[]> {
    return await fetch(`${BASE_LINK}/data/questions.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => response.json());
  }
}
