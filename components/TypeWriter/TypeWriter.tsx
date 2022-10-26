import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: ['Creative', 'React', 'Web'],
    loop: true,
    delaySpeed: 3000,
  });
  return (
    <div className={'relative w-full h-full'}>
      <div
        className={
          'absolute  translate-x-[50%] -rotate-90 origin-bottom right-0  bottom-[50%]  h-[50px] md:h-[80px] flex items-center'
        }
      >
        <h1 className={' whitespace-nowrap text-4xl text-gray-500'}>
          <span className={'font-Candal'}>{text}</span>
          <Cursor />
          <span className={'font-CaudexItalic'}> Developer</span>
        </h1>
      </div>
    </div>
  );
};
export default TypeWriter;
