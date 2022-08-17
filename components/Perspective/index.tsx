import React, { ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import useDeviceDetect from '../../utils/useDeviceDetect';

type Props = {
  children?: ReactNode;
};

export default function Perspective({ children }: Props) {
  const { isMobile } = useDeviceDetect();
  // @ts-ignore
  const x = useMotionValue(window.innerWidth / 2);
  // @ts-ignore
  const y = useMotionValue(window.innerHeight / 2);

  // @ts-ignore
  const rotateX = useTransform(y, [0, window.innerHeight], [10, -10]);
  // @ts-ignore
  const rotateY = useTransform(x, [0, window.innerHeight], [10, -10]);

  const handlePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    window.requestAnimationFrame(() => handlePosition);
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  const handleLeave = (): void => {
    // @ts-ignore
    x.set(window.innerWidth / 2);
    // @ts-ignore
    y.set(window.innerHeight / 2);
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
