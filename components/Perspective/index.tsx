import React, { ReactNode, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';
import useWindowDimensions from '../../utils/useWindowDimensions';
import useDeviceDetect from '../../utils/useDeviceDetect';
import { Container } from '../Containers';

type Props = {
  children?: ReactNode;
};

export default function Perspective({ children }: Props) {
  const { windowHeight, windowWidth } = useWindowDimensions();
  const { isMobile } = useDeviceDetect();
  const x = useMotionValue(windowWidth / 2);
  const y = useMotionValue(windowHeight / 2);

  const rotateX = useTransform(y, [0, windowHeight], [10, -10]);
  const rotateY = useTransform(x, [0, windowWidth], [10, -10]);

  const handlePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    window.requestAnimationFrame(() => handlePosition);
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  const handleLeave = (): void => {
    x.set(windowWidth / 2);
    y.set(windowHeight / 2);
  };

  if (!isMobile) {
    return (
      <Wrapper onMouseMove={handlePosition} onMouseLeave={handleLeave}>
        <Content
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transitionDuration: '0.8s',
            transitionTimingFunction: 'linear',
          }}
        >
          {children}
        </Content>
      </Wrapper>
    );
  }
  return (
    <motion.div>
      <Wrapper>
        <Content>{children}</Content>
      </Wrapper>
    </motion.div>
  );
}

const Wrapper = styled(motion.div)`
  will-change: transform;
  align-items: stretch;
  position: relative;
  perspective: 1000px;
  mix-blend-mode: inherit;
  z-index: 1;
  transform-style: preserve-3d;
`;

const Content = styled(motion.div)`
  transform-style: preserve-3d;
  will-change: transform;
  display: flex;
`;
