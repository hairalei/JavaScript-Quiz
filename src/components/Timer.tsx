import { useEffect } from 'react';
import { ActionType } from '../helpers/types';
import { useQuizContext } from '../contexts/QuizContext';

function Timer() {
  const { dispatch, timer } = useQuizContext();
  const mins = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: ActionType.Timer });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className='p-3 border rounded-md border-neutral-500'>
      {mins.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
