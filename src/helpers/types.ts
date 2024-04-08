export type Status = 'loading' | 'error' | 'ready' | 'active' | 'finished';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type BodyRequest = {
  apiKey?: string;
  limit: number;
  category: 'Code';
  tags: string[];
  difficulty: Difficulty;
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
  multiple_correct_answers: boolean;
  correct_answers: {
    answer_a_correct: boolean;
    answer_b_correct: boolean;
    answer_c_correct: boolean;
    answer_d_correct: boolean;
    answer_e_correct: boolean;
    answer_f_correct: boolean;
  };
  explanation: string;
  tip: null;
  tags: [];
  category: string;
  difficulty: Difficulty;
}
