import React, { ReactNode, useEffect, useRef, useState } from 'react';
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

type Props = {
  children: ReactNode;
  image: string;
};

export default function ParallaxImage({ children, image }: Props) {
  const { isMobile } = useDeviceDetect();
  const [wrapperDim, setWrapperDim] = useState({
    top: 0,
    height: 0,
    bottom: 0,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useViewportScroll();

  const initial = wrapperDim.top - wrapperDim.height + 64;
  const final = wrapperDim.top - 64;

  const yRange = useTransform(scrollY, [initial, final], [0, wrapperDim.top]);
  const widthRange = useTransform(
    scrollY,
    [initial, final],
    [isMobile ? '50%' : '25%', isMobile ? '75%' : '40%']
  );
  const y = useSpring(yRange, { damping: 25, mass: 1, stiffness: 75 });

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      const wrapper = wrapperRef.current;
      const onResize = () => {
        setWrapperDim({
          top:
            wrapper.getBoundingClientRect().top + window.scrollY ||
            window.pageYOffset,
          height: wrapper.clientHeight,
          bottom:
            wrapper.getBoundingClientRect().bottom + window.scrollY ||
            window.pageYOffset,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, [wrapperRef]);

  return (
    <Wrapper ref={wrapperRef}>
      <TextContainer>{children}</TextContainer>
      <div>
        <ImageContainer style={{ y, width: widthRange }}>
          <Image
            src={image}
            alt="Layout background"
            layout="fill"
            objectFit="cover"
            objectPosition="top center"
            placeholder="blur"
          />
        </ImageContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 1rem;
  @media only screen and ${device.tablet} {
    max-width: 45%;
    padding: 4rem 0 4rem 10%;
  }
`;
const ImageContainer = styled(motion.div)`
  position: fixed;
  top: 64px;
  width: 100%;
  margin: auto;
  right: 16px;
  height: 100%;
  max-height: 55vh;
  max-width: calc(100% - 2rem);
  z-index: 0;
  transition: width 0.8s;
  min-width: 50%;
  will-change: transform, width;
  @media only screen and ${device.tablet} {
    right: 10%;
    min-width: unset;
    max-width: 45%;
    max-height: calc(100vh - 128px);
  }
`;
