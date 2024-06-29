import React from 'react';
const Loader = () => (
  <div className='flex-center w-full'>
    <img
      src="/assets/icons/Loader.gif"
      alt='loader'
      width={60}
      height={60}
      className='animate-spin'
    />
  </div>
);

export default Loader;
