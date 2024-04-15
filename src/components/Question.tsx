import Options from './Options';
import { useQuizContext } from '../contexts/QuizContext';

function Question() {
  const { questions, dispatch, answer, index } = useQuizContext();
  const question = questions[index];

  return (
    <div>
      <h4 className='my-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl'>
        {question.question}
      </h4>

      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
