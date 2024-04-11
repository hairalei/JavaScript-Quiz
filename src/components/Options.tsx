import { Action, Quiz, ActionType } from '../helpers/types';
import { Dispatch } from 'react';

type PropTypes = {
  question: Quiz;
  dispatch: Dispatch<Action>;
  answer: null | number;
};

function Options({ question, dispatch, answer }: PropTypes) {
  const correctAnswer = Object.values(question.correct_answers).indexOf('true');
  const hasAnswered = answer !== null;

  return (
    <div className='flex flex-col justify-center gap-4'>
      {Object.values(question.answers).map((option, i) => {
        if (option) {
          return (
            <button
              key={i}
              type='button'
              className={`transition duration-200  
              ${hasAnswered && 'hover:cursor-not-allowed '} 
              ${
                !hasAnswered && 'hover:bg-neutral-800 hover:ml-4 bg-neutral-600'
              } 
              ${hasAnswered && correctAnswer === i && 'bg-green-600'} 
              ${
                hasAnswered &&
                correctAnswer !== i &&
                i === Number(answer) &&
                'bg-red-600'
              } `}
              onClick={() =>
                dispatch({
                  type: ActionType.NewAnswer,
                  payload: { answer: i, isCorrect: correctAnswer === i },
                })
              }
              disabled={hasAnswered}
            >
              {option}
            </button>
          );
        }
      })}
    </div>
  );
}

export default Options;
