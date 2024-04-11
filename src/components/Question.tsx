import Options from './Options';
import { Dispatch } from 'react';
import { Action, Quiz } from '../helpers/types';

type PropTypes = {
  question: Quiz;
  dispatch: Dispatch<Action>;
  answer: null | number;
};

function Question({ question, dispatch, answer }: PropTypes) {
  console.log(question);

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
