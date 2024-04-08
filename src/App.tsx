import { useReducer } from 'react';
import { Header, Loader, QuizContainer } from './components';
import { Status, Quiz } from './helpers/types';
import useFetch from './hooks/useFetch';

type State = {
  questions: Quiz[];
  status: Status;
};

const initialState = {
  questions: [],
  status: 'loading',
};

function reducer(
  state: State,
  action: { type: string; payload: Quiz[] | string }
) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload };
    default:
      return { ...state };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    data: questions,
    isLoading,
    error,
  } = useFetch({
    limit: 15,
    category: 'Code',
    tags: ['JavaScript'],
    difficulty: 'Easy',
  });

  console.log(questions);

  return (
    <div className='min-w-[100vw] min-h-[100vh] py-16 px-4 '>
      <div className='flex flex-col items-center justify-center max-w-4xl mx-auto '>
        <Header />

        {!error && isLoading ? (
          <Loader />
        ) : (
          <QuizContainer>
            {questions.map((q: Quiz) => {
              return <p key={q.id}>{q.question}</p>;
            })}
          </QuizContainer>
        )}

        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
}

export default App;
