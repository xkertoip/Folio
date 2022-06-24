import React, { ReactNode, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';

type Props = {
  children?: ReactNode;
};

function getWindowDimensions() {
  if (typeof window !== `undefined`) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  } else
    return {
      width: 800,
      height: 800,
    };
}

export default function Perspective({ children }: Props) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const x = useMotionValue(windowDimensions.width / 2);
  const y = useMotionValue(windowDimensions.height / 2);

  const rotateX = useTransform(y, [0, windowDimensions.height], [10, -10]);
  const rotateY = useTransform(x, [0, windowDimensions.width], [10, -10]);

  const handlePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    window.requestAnimationFrame(() => handlePosition);
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  const handleLeave = (): void => {
    x.set(windowDimensions.width / 2);
    y.set(windowDimensions.height / 2);
  };

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section onMouseMove={handlePosition} onMouseLeave={handleLeave}>
      <Content>
        <Container
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transitionDuration: '0.8s',
            transitionTimingFunction: 'linear',
          }}
        >
          {children}
        </Container>
      </Content>
    </motion.section>
  );
}

const Content = styled(motion.div)`
  padding: 4rem 1rem 1rem;
  min-height: 100vh;
  will-change: transform;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  position: relative;
  perspective: 1000px;
  mix-blend-mode: inherit;
  z-index: 10;
  @media only screen and ${device.tablet} {
    padding: 64px 10% 1rem;
    justify-content: center;
  }
`;

const Container = styled(motion.div)`
  transform-style: preserve-3d;
  will-change: transform;
`;
