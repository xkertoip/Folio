import styled from 'styled-components';
import { motion, useSpring, useViewportScroll } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import { device } from '../../styles/mediaQuery';

type Props = {
  index: number;
  array: string[];
};

function AnimatedImage({ index, array }: Props) {
  const { scrollY } = useViewportScroll();
  const imageRef = useRef<HTMLDivElement>(null);
  const physics = { damping: 25, mass: 1, stiffness: 75 };
  const spring = useSpring(scrollY, physics);
  return (
    <Wrapper ref={imageRef} style={{ y: spring }}>
      {array.map((image, i) => {
        return (
          <Image
            src={image}
            key={i}
            style={{
              opacity: index === i ? 1 : 0,
              transition: '0.5s',
            }}
            alt="Layout background"
            layout="fill"
            objectFit="cover"
            objectPosition="top center"
            placeholder="blur"
          />
        );
      })}
    </Wrapper>
  );
}

export default AnimatedImage;

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 64px;
  right: 16px;
  width: 100%;
  height: 100%;
  max-width: 60vw;
  max-height: 60vh;
  @media only screen and ${device.tablet} {
    max-width: 25vw;
    max-height: 80vh;
    right: 10%;
  }
`;
