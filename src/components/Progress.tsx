type PropTypes = {
  index: number;
  numQuestion: number;
  points: number;
};

function Progress({ index, numQuestion, points }: PropTypes) {
  return (
    <header className='w-full'>
      <progress className='progress' max={numQuestion} value={index} />

      <div className='flex justify-between'>
        <p>
          Question <strong>{index + 1}</strong> / {numQuestion}
        </p>

        <p>
          <strong>{points}</strong> / {numQuestion}
        </p>
      </div>
    </header>
  );
}

export default Progress;
