import styled from 'styled-components';
import Link from 'next/link';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  useSpring,
  useViewportScroll,
  motion,
  useTransform,
  useMotionValue,
} from 'framer-motion';
import { device } from '../../styles/mediaQuery';

type Props = {
  href: string;
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

export default function CircleButton({ children, href }: Props) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const x = useMotionValue(windowDimensions.width / 2);
  const y = useMotionValue(windowDimensions.height / 2);

  const { scrollYProgress } = useViewportScroll();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const physicsOutline = { damping: 25, mass: 1, stiffness: 75 };
  const springOutline = useSpring(scrollYProgress, physicsOutline);
  const transformOutline = useTransform(springOutline, [0, 1], ['-25%', '25']);
  const positionX = useTransform(
    x,
    [0, windowDimensions.width],
    ['-50%', '50%']
  );
  const positionY = useTransform(
    y,
    [0, windowDimensions.height],
    [-'50', '50']
  );

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
    <Wrapper
      ref={wrapperRef}
      onMouseMove={handlePosition}
      onMouseLeave={handleLeave}
    >
      <Link href={href}>
        <a>
          <motion.div style={{ y: positionY, x: positionX }}>
            {children}
          </motion.div>
          <CircleOutline style={{ y: transformOutline }} />
        </a>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  a {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 80vw;
    min-height: 80vw;
    border-radius: 50%;
    border-color: var(--mainColor);
    border-width: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    div {
      text-align: center;
      transition-duration: 0.3s;
      transition-timing-function: linear;
      will-change: transform;
    }
  }
  button {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media only screen and ${device.tablet} {
    padding: 8rem 0;
    a {
      max-width: 30vw;
      min-height: 30vw;
    }
  }
`;
const CircleOutline = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: var(--mainColor);
  will-change: transform;
  :hover {
    background-color: var(--main);
    transition: 0.5s;
  }
`;
