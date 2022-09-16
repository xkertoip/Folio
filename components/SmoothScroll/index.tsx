import React, { useRef, ReactNode } from 'react';
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
  const element = useElementProperties({ wrapperRef });
  const { scrollY } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const transform = useTransform(
    scrollY,
    [0, element.elementHeight],
    [0, -element.elementHeight]
  );

  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <Wrapper ref={wrapperRef} style={{ y: spring }}>
        {children}
      </Wrapper>
      <div style={{ height: element.elementHeight }} />
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
