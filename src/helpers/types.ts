type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Status = 'loading' | 'error' | 'ready' | 'active' | 'finished';

export type BodyRequest = {
  apiKey?: string;
  limit: number;
  category: 'Code';
  tags: string[];
  difficulty: Difficulty;
};

export type CorrectAnswers = {
  answer_a_correct: string;
  answer_b_correct: string;
  answer_c_correct: string;
  answer_d_correct: string;
  answer_e_correct: string;
  answer_f_correct: string;
};

export interface Quiz {
  id: number | string;
  question: string;
  answers: {
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e: string;
    answer_f: string;
  };
  correct_answer: string;
  multiple_correct_answers: string;
  correct_answers: CorrectAnswers;
  explanation?: string;
  tip?: null;
  tags: [];
  category: string;
  difficulty: Difficulty;
}

export type State = {
  questions: Quiz[];
  status: Status;
  index: number;
  answer: null | number;
  points: number;
};

export type Answer = {
  answer: number;
  isCorrect: boolean;
};

export type Action = {
  type: string;
  payload?: Quiz[] | string | number | Answer;
};

//----------------- enums ---------------------//

export enum ActionType {
  DataReceived = 'dataReceived',
  DataFailed = 'dataFailed',
  Start = 'start',
  NewAnswer = 'newAnswer',
  NextQuestion = 'nextQuestion',
}
