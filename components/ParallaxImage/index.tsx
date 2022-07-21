import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';
import Image from 'next/image';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import useDeviceDetect from '../../utils/useDeviceDetect';
import useElementProperties from '../../utils/useElementProperties';

type Props = {
  children: ReactNode;
  image: string;
  offset?: number;
};

export default function ParallaxImage({ children, image, offset = 80 }: Props) {
  const { isMobile } = useDeviceDetect();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { elementHeight, elementTop } = useElementProperties({ wrapperRef });
  const { scrollY } = useViewportScroll();
  console.log(elementHeight);

  const initial = elementTop;
  const final = elementHeight / 2 - offset;

  const yRange = useTransform(
    scrollY,
    [initial, final],
    [offset, elementHeight / 2 + offset]
  );
  const widthRange = useTransform(
    scrollY,
    [initial, final],
    [isMobile ? '50%' : '25%', isMobile ? '75%' : '40%']
  );
  const y = useSpring(yRange, { damping: 25, mass: 1, stiffness: 75 });

  return (
    <Wrapper ref={wrapperRef}>
      {children}
      <ImageContainer
        style={{
          y,
          width: widthRange,
        }}
      >
        <Image
          src={image}
          alt="Layout background"
          layout="fill"
          objectFit="cover"
          objectPosition="top center"
          placeholder="blur"
        />
      </ImageContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const TextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and ${device.tablet} {
    max-width: 45%;
  }
`;
const ImageContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  top: 0;
  margin: auto;
  right: 16px;
  height: 100%;
  max-width: calc(100% - 2rem);
  max-height: 55vh;
  z-index: 0;
  transition: width 0.8s;
  min-width: 50%;
  will-change: transform, width;
  @media only screen and ${device.tablet} {
    right: 10%;
    min-width: unset;
    max-width: 45%;
    max-height: calc(100vh - 10rem);
  }
`;
