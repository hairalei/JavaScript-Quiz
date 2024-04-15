import { ActionType } from '../helpers/types';
import { useQuizContext } from '../contexts/QuizContext';

function StartQuiz() {
  const { numQuestions, dispatch } = useQuizContext();
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
