import styled from 'styled-components';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import { device } from '../../styles/mediaQuery';

type Props = {
  index: number;
  array: string[];
};

function FollowImage({ index, array }: Props) {
  const { scrollY, scrollYProgress } = useViewportScroll();
  const imageRef = useRef<HTMLDivElement>(null);
  const physics = { damping: 25, mass: 1, stiffness: 75 };
  const spring = useSpring(scrollY, physics);
  const springWidth = useSpring(scrollYProgress, physics);
  const widthImg = useTransform(springWidth, [0, 1], ['25%', '100%']);
  return (
    <Wrapper ref={imageRef} style={{ y: spring, width: widthImg }}>
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

export default FollowImage;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 64px;
  width: 100%;
  margin: auto;
  right: 16px;
  height: 100%;
  max-height: 60vh;
  max-width: calc(100% - 2rem);
  z-index: 1;
  transition: max-width 2s;
  min-width: 50%;
  will-change: transform, width;
  @media only screen and ${device.tablet} {
    right: 10%;
    min-width: unset;
    max-width: 80%;
    max-height: calc(100vh - 128px);
  }
`;
