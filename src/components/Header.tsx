import jsSVG from '../assets/JS.svg';

function Header() {
  return (
    <div className='flex gap-3 mb-8'>
      <img src={jsSVG} alt='' className='rounded-md w-14 h-14' />
      <h1 className='text-1xl'>The JavaScript Quiz</h1>
      <img src={jsSVG} alt='' className='rounded-md w-14 h-14' />
    </div>
  );
}

export default Header;
