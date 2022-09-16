import styled from 'styled-components';

import React, { useRef } from 'react';

import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import useElementProperties from '../../utils/useElementProperties';

const Background = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElementProperties({ wrapperRef });
  const { scrollY } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const transform = useTransform(
    scrollY,
    [0, element.elementWidth],
    [-element.elementWidth + window.innerHeight, element.elementWidth + 50]
  );
  const physics = { damping: 100, mass: 1, stiffness: 225 };
  const spring = useSpring(transform, physics);
  return (
    <Wrapper
      style={{
        y: spring,
      }}
    >
      <Title ref={wrapperRef}>
        <h1>CREATIVE DEVELOPER</h1>
      </Title>
    </Wrapper>
  );
};

export default Background;

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 1;
`;
const Title = styled.div`
  transform-origin: top right;
  top: 0;
  right: 0;
  transform: rotate(-90deg) translateY(-100%);
  white-space: nowrap;
  position: absolute;
  padding-bottom: 1rem;
  h1 {
    font-size: 37vw;
    margin: 0;
    line-height: 0.8;
    color: var(--main);
    opacity: 0.8;
  }
  span {
    z-index: -1;
  }
`;
