import React, {
  useRef,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion';
import styled from 'styled-components';
import useElementProperties from '../../utils/useElementProperties';

type Props = {
  children: ReactNode;
};

function SmoothScroll({ children }: Props) {
  const wrapperRef = useRef(null);
  const { elementHeight } = useElementProperties({ wrapperRef });

  const { scrollY } = useViewportScroll();
  const transform = useTransform(
    scrollY,
    [0, elementHeight],
    [0, -elementHeight]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <Wrapper ref={wrapperRef} style={{ y: spring }} layoutScroll>
        {children}
      </Wrapper>
      <div style={{ height: elementHeight }} />
    </>
  );
}

export default SmoothScroll;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  will-change: transform;
`;
