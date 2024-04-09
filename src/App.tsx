import { useReducer, useEffect } from 'react';
import {
  Header,
  Loader,
  QuizContainer,
  Error as ErrorPage,
} from './components';
import { Status, Quiz } from './helpers/types';

type State = {
  questions: Quiz[];
  status: Status;
};

type Action = {
  type: string;
  payload?: Quiz[] | string;
};

const initialState: State = {
  questions: [],
  status: 'loading',
};

const token: string = import.meta.env.VITE_QUIZ_TOKEN as string;
const baseUrl: string = import.meta.env.VITE_BASE_URL as string;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload as Quiz[], status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Unhandled action type');
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const queryParams: Record<string, string> = {
    apiKey: token,
    limit: '15',
    category: 'Code',
    tags: ['JavaScript'].join(','),
    difficulty: 'easy',
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
        dispatch({ type: 'dataReceived', payload: responseData });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: 'error', payload: err.message });
        } else {
          dispatch({ type: 'error', payload: 'An unknown error occurred' });
        }
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className='min-w-[100vw] min-h-[100vh] py-16 px-4 '>
      <div className='flex flex-col items-center justify-center max-w-4xl mx-auto '>
        <Header />

        <QuizContainer>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorPage />}
          {status === 'ready' &&
            questions.map((q: Quiz) => {
              return <p key={q.id}>{q.question}</p>;
            })}
        </QuizContainer>
      </div>
    </div>
  );
}

export default App;
