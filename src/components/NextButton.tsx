import { Dispatch } from 'react';
import { Action, ActionType } from '../helpers/types';

type PropTypes = {
  dispatch: Dispatch<Action>;
  answer: null | number;
  index: number;
  numQuestions: number;
};

function NextButton({ dispatch, answer, index, numQuestions }: PropTypes) {
  const isFinished = index === numQuestions - 1;

  if (answer === null) return null;

  return (
    <button
      onClick={() =>
        dispatch({
          type: isFinished ? ActionType.Finished : ActionType.NextQuestion,
        })
      }
    >
      {isFinished ? 'Finish' : 'Next'}
    </button>
  );
}

export default NextButton;
