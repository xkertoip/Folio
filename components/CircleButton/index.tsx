import styled from 'styled-components';
import Link from 'next/link';
import React, { ReactNode, useRef } from 'react';
import {
  useSpring,
  useViewportScroll,
  motion,
  useTransform,
} from 'framer-motion';
import { device } from '../../styles/mediaQuery';

import Image from 'next/image';
import useElementProperties from '../../utils/useElementProperties';

type Props = {
  link: string;
  children?: ReactNode;
  image: string;
  offset?: number;
};

const variantsText = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 0,
  },
};

const variantsImage = {
  hidden: {
    scale: 0,
  },
  hover: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  show: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function CircleButton({
  children,
  link,
  image,
  offset = 64,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { elementTop } = useElementProperties({ wrapperRef });
  const { scrollY } = useViewportScroll();

  const initial = elementTop - offset;
  const final = elementTop + offset;

  const yRange = useTransform(scrollY, [initial, final], [-offset, offset]);
  const outlineY = useSpring(yRange, { damping: 25, mass: 1, stiffness: 75 });
  const textY = useSpring(yRange, { damping: 25, mass: 1, stiffness: 75 });

  /*const x = useMotionValue(windowDimensions.width / 2);
  const y = useMotionValue(windowDimensions.height / 2);*/

  /*const physicsOutline = { damping: 25, mass: 1, stiffness: 75 };
  const springOutline = useSpring(scrollYProgress, physicsOutline);
  const transformOutline = useTransform(springOutline, [0, 1], ['-55%', '55%']);
  const positionX = useTransform(
    x,
    [0, windowDimensions.width],
    ['-25%', '25%']
  );
  const positionY = useTransform(
    y,
    [0, windowDimensions.height],
    [-'25', '25']
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
  }, []);*/

  return (
    <Wrapper
      ref={wrapperRef}
      /*      onMouseMove={handlePosition}
      onMouseLeave={handleLeave}*/
    >
      <Link href={link}>
        <motion.a whileHover="show" initial="hidden">
          <motion.div style={{ y: textY }} variants={variantsText}>
            {children}
          </motion.div>
          <CircleOutline style={{ y: outlineY }} />
          <HiddenCircle variants={variantsImage}>
            <HiddenImage style={{ y: textY }}>
              <Image
                src={image}
                alt="mail"
                layout="responsive"
                objectFit="contain"
                objectPosition="top center"
              />
            </HiddenImage>
          </HiddenCircle>
        </motion.a>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  padding: 8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
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
    a {
      max-width: 30vw;
      min-height: 30vw;
    }
  }
`;
const HiddenCircle = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: transparent;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HiddenImage = styled(motion.div)`
  width: 40%;
  height: 40%;
`;
const CircleOutline = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  will-change: transform;
  background-color: var(--background);
  z-index: -1;
  box-shadow: 0 2px 2px -1px rgb(37 150 190 / 20%),
    0 4px 2px 0 rgb(37 150 190 / 14%), 0 1px 4px 0 rgb(37 150 190);
`;
