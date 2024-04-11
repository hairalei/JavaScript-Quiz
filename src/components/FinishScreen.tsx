import { Dispatch } from 'react';
import { Action, ActionType } from '../helpers/types';

type PropTypes = {
  dispatch: Dispatch<Action>;
  points: number;
  numQuestions: number;
  highscore: number;
};

function FinishScreen({
  points,
  numQuestions,
  highscore,
  dispatch,
}: PropTypes) {
  const percentage = (points / numQuestions) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='p-5 mt-6 text-xl text-center bg-green-600 rounded-full'>
        You scored <strong>{points}</strong> out of {numQuestions} (
        {Math.ceil(percentage)}%) {emoji}
      </p>

      <p className='mt-2 text-center text-md'>Highscore: {highscore} points</p>

      <button
        onClick={() => dispatch({ type: ActionType.Restart })}
        className='block px-4 py-2 mt-10 ml-auto font-semibold text-green-600 bg-transparent border border-green-500 rounded hover:bg-green-700 hover:text-green-100 hover:border-transparent'
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
