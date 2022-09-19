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
    [-element.elementWidth + window.innerHeight, 0]
  );
  const physics = { damping: 100, mass: 1, stiffness: 200 };
  const spring = useSpring(transform, physics);
  return (
    <Wrapper>
      <Title
        style={{
          y: spring,
        }}
      >
        <motion.h1 ref={wrapperRef}>CREATIVE DEVELOPER</motion.h1>
      </Title>
    </Wrapper>
  );
};

export default Background;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  :before,
  :after {
    content: '';
    width: 0.5px;
    min-height: 100%;
    background-color: var(--secondary);
    position: fixed;
    top: 0;
    z-index: -1;
  }
  :before {
    right: 15%;
  }
  :after {
    right: 45%;
  }
`;
const Title = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;

  h1 {
    font-size: 37vw;
    margin: 0;
    line-height: 0.8;
    color: var(--specialColor);
    transform-origin: top right;
    top: 0;
    right: 0;
    transform: rotate(-90deg) translateY(-100%);
    white-space: nowrap;
    position: absolute;
    padding-bottom: 1rem;
  }
  span {
    z-index: -1;
  }
`;
