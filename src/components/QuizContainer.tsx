import { ReactNode } from 'react';

function QuizContainer({ children }: { children: ReactNode }) {
  return <main className='w-full max-w-xl'>{children}</main>;
}

export default QuizContainer;
