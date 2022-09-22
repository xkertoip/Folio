import React, { ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import useDeviceDetect from '../../utils/useDeviceDetect';

type Props = {
  children?: ReactNode;
};

export default function Perspective({ children }: Props) {
  const { isMobile } = useDeviceDetect();
  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight / 2);

  const rotateX = useTransform(y, [0, window.innerHeight], [20, -20]);
  const rotateY = useTransform(x, [0, window.innerWidth], [20, -20]);

  const handlePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    window.requestAnimationFrame(() => handlePosition);
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };
  const handleLeave = (): void => {
    x.set(window.innerWidth / 2);
    y.set(window.innerHeight / 2);
  };

  if (!isMobile) {
    return (
      <motion.div onMouseMove={handlePosition} onMouseLeave={handleLeave}>
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transitionDuration: '0.8s',
            transitionTimingFunction: 'linear',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

/*
const Wrapper = styled.div`
  will-change: transform;
  position: relative;
  perspective: 1000px;
  mix-blend-mode: inherit;
  transform-style: preserve-3d;
  min-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Content = styled(motion.div)`
  transform-style: preserve-3d;
  will-change: transform;
`;
*/
