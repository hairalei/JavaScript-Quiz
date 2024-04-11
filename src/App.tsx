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
  FinishScreen,
  Timer,
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
  highscore: 0,
  timer: 0,
};

const SECS_PER_QUESTION = 45;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.DataReceived:
      return { ...state, questions: action.payload as Quiz[], status: 'ready' };
    case ActionType.DataFailed:
      return { ...state, status: 'error' };
    case ActionType.Start:
      return {
        ...state,
        status: 'active',
        timer: state.questions.length * SECS_PER_QUESTION,
      };
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
    case ActionType.Finished:
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ActionType.Restart:
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };
    case ActionType.Timer:
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Unhandled action type');
  }
};

function App() {
  const [
    { questions, status, index, answer, points, highscore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);

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
          {status === 'finished' && (
            <FinishScreen
              dispatch={dispatch}
              points={points}
              numQuestions={numQuestions}
              highscore={highscore}
            />
          )}
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

              <footer className='flex justify-between mt-6'>
                <Timer dispatch={dispatch} timer={timer} />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numQuestions}
                />
              </footer>
            </>
          )}
        </QuizContainer>
      </div>
    </div>
  );
}

export default App;
