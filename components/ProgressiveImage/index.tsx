import styled from 'styled-components';
import { motion } from 'framer-motion';
import { device } from '../../styles/mediaQuery';
import Image from 'next/image';
type Props = {
  isProgressive?: boolean;
  image: string;
};

function ProgressiveImage({ isProgressive, image }: Props) {
  return (
    <Wrapper>
      <Image
        src={image}
        alt="Layout background"
        layout="fill"
        objectFit="cover"
        objectPosition="top center"
        placeholder="blur"
      />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 64px;
  right: 35%;
  width: 100%;
  z-index: -1;
  transition: all 1s;
  :hover {
    max-width: 100%;
  }
  @media only screen and ${device.tablet} {
    max-width: 20%;
    height: 50vh;
  }
`;

export default ProgressiveImage;
