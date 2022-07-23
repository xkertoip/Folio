import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
const facebook = require('/images/facebook.svg');
const linkedIn = require('/images/linkedin.svg');
const github = require('/images/github.svg');

const variants = {
  hidden: {
    y: '10vh',
  },
  show: {
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function SocialMedia() {
  return (
    <Wrapper>
      <Link href="https://www.linkedin.com/in/piotr-szczypka/" target="_blank">
        <a>
          <ImageContainer variants={variants} initial="hidden" animate="show">
            <Image
              src={linkedIn}
              alt="linkedIn"
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
        </a>
      </Link>
      <Link href="https://www.github.com/xkertoip" target="_blank">
        <a>
          <ImageContainer variants={variants} initial="hidden" animate="show">
            <Image
              src={github}
              alt="github"
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
        </a>
      </Link>
      <Link href="https://www.facebook.com/piotrek.szczypka/" target="_blank">
        <a>
          <ImageContainer variants={variants} initial="hidden" animate="show">
            <Image
              src={facebook}
              alt="facebook"
              layout="fill"
              objectFit="contain"
            />
          </ImageContainer>
        </a>
      </Link>
    </Wrapper>
  );
}

const ImageContainer = styled(motion.div)`
  color: var(--main);
  height: 40px;
  width: 40px;
  text-align: right;
  transition: 0.5s;
  overflow: hidden;
  position: relative;

  :before {
    content: '';
    min-width: 100%;
    height: 3px;
    top: 50%;
    left: 0;
    position: absolute;
    margin: auto;
    background-color: var(--mainColor);
    transform: translateX(-100%);
    transition-duration: 0.5s;
    z-index: 1;
  }
  :hover {
    color: var(--specialColor);
    :before {
      transform: translateX(0);
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: flex-end;
  overflow: hidden;
  gap: 2rem;
  align-items: end;
  z-index: 1000;
  text-align: right;
`;
