import { ReactNode } from 'react';

function QuizContainer({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}

export default QuizContainer;
