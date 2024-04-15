import { ActionType } from '../helpers/types';
import { useQuizContext } from '../contexts/QuizContext';

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuizContext();
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
