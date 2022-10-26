import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
};

const variants = {
  animate: {
    x: ['-100%', '0%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export default function InfiniteLoop({ children }: Props) {
  const [loopElement, setLoopElement] = useState(1);
  const [animate, setAnimate] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  function resetAnimation() {
    if (innerRef?.current) {
      setAnimate(false);

      setTimeout(() => {
        if (innerRef?.current) {
          setAnimate(true);
        }
      }, 10);
    }
  }

  const setupElement = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;
    const { width } = innerRef.current.getBoundingClientRect();
    const { width: parentWidth } = outerRef.current.getBoundingClientRect();

    const widthDeficit = parentWidth - width;
    const elementWidth = width / innerRef.current.children.length;
    if (widthDeficit) {
      setLoopElement(loopElement + Math.ceil(widthDeficit / elementWidth) + 1);
    }
    resetAnimation();
  }, [loopElement]);

  useEffect(() => setupElement(), [setupElement]);
  useEffect(() => {
    window.addEventListener('resize', setupElement);
    return () => window.removeEventListener('resize', setupElement);
  }, [loopElement, setupElement]);

  return (
    <div ref={outerRef} className={'w-full overflow-hidden'}>
      <div ref={innerRef} className={'flex justify-center w-fit'}>
        {[...Array(loopElement)].map((_, index) => (
          <motion.div
            key={index}
            className={'flex w-max animate-none'}
            variants={variants}
            animate={animate && 'animate'}
          >
            {children}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
