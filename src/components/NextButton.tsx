import { Dispatch } from 'react';
import { Action, ActionType } from '../helpers/types';

type PropTypes = {
  dispatch: Dispatch<Action>;
  answer: null | number;
};

function NextButton({ dispatch, answer }: PropTypes) {
  if (answer === null) return null;

  return (
    <button onClick={() => dispatch({ type: ActionType.NextQuestion })}>
      Next
    </button>
  );
}

export default NextButton;
