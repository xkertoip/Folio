import React, { useRef, ReactNode, useState, useEffect } from 'react';
import { useTransform, useSpring, motion, useScroll } from 'framer-motion';

type Props = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const { scrollY } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const ro = new ResizeObserver((elements) => {
      for (let elem of elements) {
        const crx = elem.contentRect;
        setHeight(crx.height);
      }
    });
    if (wrapperRef.current) {
      ro.observe(wrapperRef.current);
    }
  }, [wrapperRef]);

  const transform = useTransform(scrollY, [0, height], [0, -height]);

  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        ref={wrapperRef}
        style={{ y: spring }}
        className={'fixed top-0 left-0 w-full overflow-hidden'}
      >
        {children}
      </motion.div>
      <div style={{ height: height }} />
    </>
  );
};

export default SmoothScroll;
