import { useQuizContext } from '../contexts/QuizContext';

function Progress() {
  const { index, numQuestions, points } = useQuizContext();
  return (
    <header className='w-full'>
      <progress className='progress' max={numQuestions} value={index} />

      <div className='flex justify-between'>
        <p>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>

        <p>
          <strong>{points}</strong> / {numQuestions}
        </p>
      </div>
    </header>
  );
}

export default Progress;
