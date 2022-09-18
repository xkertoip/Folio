import React, { useRef, ReactNode, useState, useEffect } from 'react';
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
  useScroll,
} from 'framer-motion';
import styled from 'styled-components';
import useElementProperties from '../../utils/useElementProperties';

type Props = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(window.innerHeight);
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
      <Wrapper ref={wrapperRef} style={{ y: spring }}>
        {children}
      </Wrapper>
      <div style={{ height: height }} />
    </>
  );
};

export default SmoothScroll;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  will-change: transform;
`;
