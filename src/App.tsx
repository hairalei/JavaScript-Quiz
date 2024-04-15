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
import { useQuizContext } from './contexts/QuizContext';

function App() {
  const { status } = useQuizContext();

  return (
    <div className='min-w-[100vw] min-h-[100vh] py-16 px-4 '>
      <div className='flex flex-col items-center justify-center max-w-3xl mx-auto '>
        <Header />

        <QuizContainer>
          {status === 'loading' && <Loader />}
          {status === 'error' && <ErrorPage />}
          {status === 'finished' && <FinishScreen />}
          {status === 'ready' && <StartQuiz />}
          {status === 'active' && (
            <>
              <Progress />

              <Question />

              <footer className='flex justify-between mt-6'>
                <Timer />
                <NextButton />
              </footer>
            </>
          )}
        </QuizContainer>
      </div>
    </div>
  );
}

export default App;
