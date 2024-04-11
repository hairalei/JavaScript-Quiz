import jsSVG from '../assets/JS.svg';

function Header() {
  return (
    <div className='flex items-center gap-3 mb-8 md:mb-20'>
      <img
        src={jsSVG}
        alt=''
        className='rounded-md size-7 sm:size-10 md:size-14'
      />
      <h1 className='text-xl sm:text-3xl md:text-5xl'>The JavaScript Quiz</h1>
      <img
        src={jsSVG}
        alt=''
        className='rounded-md size-7 sm:size-10 md:size-14'
      />
    </div>
  );
}

export default Header;
