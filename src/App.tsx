import { useReducer, useEffect } from 'react';
import {
  Header,
  Loader,
  QuizContainer,
  Error as ErrorPage,
  StartQuiz,
  Question,
  NextButton,
  Progress,
} from './components';
import { State, Quiz, Action, ActionType, Answer } from './helpers/types';

const token: string = import.meta.env.VITE_QUIZ_TOKEN as string;
const baseUrl: string = import.meta.env.VITE_BASE_URL as string;

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.DataReceived:
      return { ...state, questions: action.payload as Quiz[], status: 'ready' };
    case ActionType.DataFailed:
      return { ...state, status: 'error' };
    case ActionType.Start:
      return { ...state, status: 'active' };
    case ActionType.NewAnswer: {
      const { answer, isCorrect } = action.payload as Answer;
      return {
        ...state,
        answer,
        points: isCorrect ? state.points + 1 : state.points,
      };
    }
    case ActionType.NextQuestion:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error('Unhandled action type');
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  const queryParams: Record<string, string> = {
    apiKey: token,
    limit: '15',
    category: 'Code',
    tags: ['JavaScript'].join(','),
    multiple_correct_answers: 'false',
  };

  // Construct the query string
  const queryString = new URLSearchParams(queryParams).toString();

  // Construct and return the full URL
  const url = `${baseUrl}?${queryString}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        dispatch({ type: ActionType.DataReceived, payload: responseData });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: ActionType.DataFailed, payload: err.message });
        } else {
          dispatch({
            type: ActionType.DataFailed,
            payload: 'An unknown error occurred',
          });
        }
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className='min-w-[100vw] min-h-[100vh] py-16 px-4 '>
      <div className='flex flex-col items-center justify-center max-w-3xl mx-auto '>
        <Header />

        <QuizContainer>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorPage />}
          {status === 'ready' && (
            <StartQuiz numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === 'active' && (
            <>
              <Progress
                index={index}
                numQuestion={numQuestions}
                points={points}
              />

              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />

              <div className='flex flex-col items-end mt-6'>
                <NextButton dispatch={dispatch} answer={answer} />
              </div>
            </>
          )}
        </QuizContainer>
      </div>
    </div>
  );
}

export default App;
