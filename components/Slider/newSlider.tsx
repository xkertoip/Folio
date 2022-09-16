import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import Image from 'next/image';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';
import { useTranslation } from 'next-i18next';
import { Container } from '../Containers';
const next = require('/images/next.svg');
const prev = require('/images/prev.svg');

type Props = {
  array: [];
};

const variantsImage = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
};

const variantsText = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? '-100%' : '100%',
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const NewSlider = ({ array }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, array.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const { t } = useTranslation('common');
  return (
    <Wrapper as={Container}>
      <Content>
        <ImageContainer>
          <TitleContainer>
            <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
              <motion.h2
                variants={variantsText}
                custom={direction}
                key={page}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.2 },
                }}
              >
                {array[imageIndex]['title']}
              </motion.h2>
            </AnimatePresence>
          </TitleContainer>
          <AnimatePresence initial={false} custom={direction}>
            <ImageWrapper
              key={page}
              custom={direction}
              variants={variantsImage}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <Image
                src={array[imageIndex]['image']['responsiveImage']['src']}
                alt="slide"
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper>
          </AnimatePresence>
        </ImageContainer>
      </Content>

      <TextContent>
        <Circle>
          <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
            <motion.h2
              variants={variantsText}
              custom={direction}
              key={page}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.2 },
              }}
            >
              {array[imageIndex]['order']}
            </motion.h2>
          </AnimatePresence>
        </Circle>
        <ButtonContainer>
          <Button onClick={() => paginate(-1)}>
            <Image src={prev} alt="prev" />
          </Button>
          <Button onClick={() => paginate(1)}>
            <Image src={next} alt="next" />
          </Button>
        </ButtonContainer>
      </TextContent>
    </Wrapper>
  );
};

export default NewSlider;

const ContentLink = styled.a`
  z-index: 2;
  position: relative;
  white-space: nowrap;
  justify-content: flex-end;
  display: flex;
  width: 100%;
  letter-spacing: 1px;
`;
const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;
const Button = styled.button`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  border-radius: 50%;
  border-top: 2px solid var(--specialColor);
  @media only screen and ${device.tablet} {
    width: 65px;
    height: 65px;
  }
`;
const Wrapper = styled.div`
  position: relative;
  @media only screen and ${device.tablet} {
    display: flex;
  }
`;
const Content = styled.div`
  position: relative;
  @media only screen and ${device.tablet} {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
const TextContent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and ${device.tablet} {
    flex-direction: column;
    align-items: start;
  }
`;
const Circle = styled.div`
  position: relative;
  overflow: hidden;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--mainColor);
    transform: translate(-50%, -50%);
  }
  @media only screen and ${device.tablet} {
    width: ;
  }
`;
const TitleContainer = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: left;
  padding: 0 1rem;
`;
const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 40vh;
  width: 100%;
  margin: 2rem 0;
  @media only screen and ${device.tablet} {
    height: 60vh;
    margin: 0;
  }
`;
const Text = styled.div`
  position: relative;

  @media only screen and ${device.tablet} {
    width: 40%;
  }
`;
const ImageWrapper = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const Title = styled(motion.h3)`
  position: relative;
  z-index: 2;
`;
