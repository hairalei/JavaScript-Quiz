import { Dispatch } from 'react';
import { Action, ActionType } from '../helpers/types';

type PropTypes = {
  numQuestions: number;
  dispatch: Dispatch<Action>;
};

function StartQuiz({ numQuestions, dispatch }: PropTypes) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-2 text-lg sm:text-2xl md:text-4xl'>
        Welcome to The JavaScript Quiz
      </h2>
      <h3 className='mb-10 text-md sm:text-xl md:text-2xl'>
        {numQuestions} questions to test your JavaScript mastery
      </h3>

      <button
        type='button'
        onClick={() => dispatch({ type: ActionType.Start })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartQuiz;
