import React, { ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';
import { useInView } from 'react-intersection-observer';
import useWindowDimensions from '../../utils/useWindowDimensions';

type Props = {
  children?: ReactNode;
};

export default function Perspective({ children }: Props) {
  const { width, height } = useWindowDimensions();
  const [ref, inView] = useInView();
  const x = useMotionValue(width / 2);
  const y = useMotionValue(height / 2);

  const rotateX = useTransform(y, [0, height], [10, -10]);
  const rotateY = useTransform(x, [0, width], [10, -10]);

  const handlePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    window.requestAnimationFrame(() => handlePosition);
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  const handleLeave = (): void => {
    x.set(width / 2);
    y.set(height / 2);
  };

  return (
    <motion.div
      onMouseMove={handlePosition}
      onMouseLeave={handleLeave}
      ref={ref}
    >
      <Content>
        <Container
          style={{
            rotateX: inView ? rotateX : 0,
            rotateY: inView ? rotateY : 0,
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
