import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import AnimateBackground from '../AnimateImage';
import { device } from '../../styles/mediaQuery';

type Props = {
  children: ReactNode;
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
  const [windowDemensions, setWindowDemensions] = useState(
    getWindowDimensions()
  );

  const x = useMotionValue(windowDemensions.width / 2);
  const y = useMotionValue(windowDemensions.height / 2);

  const rotateX = useTransform(y, [0, windowDemensions.height], [10, -10]);
  const rotateY = useTransform(x, [0, windowDemensions.width], [10, -10]);

  const handlePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    window.requestAnimationFrame(() => handlePosition);
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  const handleLeave = (): void => {
    x.set(windowDemensions.width / 2);
    y.set(windowDemensions.height / 2);
  };

  useEffect(() => {
    function handleResize() {
      setWindowDemensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div onMouseMove={handlePosition} onMouseLeave={handleLeave}>
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
    </motion.div>
  );
}

const Content = styled(motion.div)`
  min-height: 100vh;
  padding: 64px 16px;
  display: flex;
  will-change: transform;
  flex-direction: column;
  justify-content: end;
  align-items: stretch;
  position: relative;
  perspective: 1000px;
  mix-blend-mode: inherit;
  z-index: 10;
  @media only screen and ${device.tablet} {
    padding: 0 10%;
    justify-content: center;
  }
`;

const Container = styled(motion.div)`
  transform-style: preserve-3d;
`;
