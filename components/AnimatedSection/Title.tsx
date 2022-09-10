import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { device } from '../../styles/mediaQuery';
import Image from 'next/image';
const backgroundImage = require('/images/home_background.jpg');

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  const x = useMotionValue(100);

  const translateX = useTransform(x, [0, 100], [0, 100]);

  function handleMouseMove(event: any) {
    x.set(event.pageX);
    console.log(event.pageX);
  }
  return (
    <Wrapper>
      <Content onMouseMove={handleMouseMove}>{title}</Content>
      {/*      <BackgroundImage>
        <Image
          src={backgroundImage}
          alt="backgroundImage"
          layout="fill"
          objectFit="cover"
        />
      </BackgroundImage>
      <AlterImage
        style={{
          transform: `translateX(${translateX})`,
        }}
      >
        <Image
          src={backgroundImage}
          alt="backgroundImage"
          layout="fill"
          objectFit="cover"
        />
      </AlterImage>*/}
    </Wrapper>
  );
}
const AlterImage = styled(motion.div)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 30%;
  min-height: 100%;
  transition-duration: 1s;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
`;

const Wrapper = styled(motion.div)`
  transform-style: preserve-3d;
  overflow: hidden;

  @media only screen and ${device.tablet} {
    text-align: center;
  }
`;
const Content = styled(motion.h1)`
  text-transform: uppercase;
  font-size: 7vh;
  padding: 0 1rem;
  z-index: 1;
  position: relative;
  @media only screen and ${device.tablet} {
    font-size: 20vh;
  }
`;
