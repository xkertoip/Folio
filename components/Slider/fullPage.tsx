import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import React, { useRef, useState } from 'react';
import { device } from '../../styles/mediaQuery';
import Image from 'next/image';
const next = require('/images/next.svg');
const prev = require('/images/prev.svg');
import useElementProperties from '../../utils/useElementProperties';
import useWindowDimensions from '../../utils/useWindowDimensions';
import { useTranslation } from 'next-i18next';

const variantsButton = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const variantsWrapper = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    zIndex: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
};
const variantsText = {
  hidden: (direction: number) => {
    return {
      y: direction >= 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 1,
      },
    };
  },
  show: {
    y: 0,
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
};
const variantsScale = {
  close: {
    scaleX: 0,
    opacity: 0,
  },
  open: {
    scaleX: 1,
    opacity: 1,
  },
};
const hideOrder = {};

type Props = {
  array: [];
};

export default function FullPage({ array }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [[transition, direction], setTransition] = useState([0, 0]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const { windowHeight } = useWindowDimensions();
  const { elementHeight } = useElementProperties({
    wrapperRef,
  });
  const { t } = useTranslation('common');

  const handleIncrease = () => {
    if (current < array.length - 1) {
      setTransition([transition - elementHeight, -1]);
      setCurrent(current + 1);
    }
  };
  const handleDecrease = () => {
    if (current > 0) {
      setTransition([transition + elementHeight, 1]);
      setCurrent(current - 1);
    }
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Wrapper>
        {array?.map(
          ({
            id,
            image,
            title,
            introduction,
            technology,
            order,
            description,
          }: Project) => (
            <motion.div key={id}>
              <Background
                ref={wrapperRef}
                style={{
                  backgroundImage: `url(${image.responsiveImage.src})`,
                  height: windowHeight,
                }}
                animate={{
                  y: transition,
                  transition: {
                    duration: 1,
                  },
                }}
              />
              <Content
                animate={current === order - 1 ? 'show' : 'hidden'}
                variants={variantsWrapper}
              >
                <Mask>
                  <Mask
                    style={{
                      display: 'flex',
                      opacity: open ? 0 : 1,
                      y: open ? '100%' : 0,
                      zIndex: open ? -1 : 1,
                    }}
                  >
                    <motion.h1 variants={variantsText} custom={direction}>
                      {order}
                    </motion.h1>
                  </Mask>
                </Mask>

                <Text>
                  <Introduction
                    style={{
                      x: open ? 100 : 0,
                      opacity: open ? 0 : 1,
                    }}
                  >
                    <Mask>
                      <Technology variants={variantsText} custom={direction}>
                        {technology}
                      </Technology>
                    </Mask>
                    <Mask>
                      <Title variants={variantsText} custom={direction}>
                        {title}
                      </Title>
                    </Mask>
                    <Mask>
                      <motion.p variants={variantsText} custom={direction}>
                        {introduction}
                        <ReadMore onClick={() => handleOpen()}>
                          {t(`readMore`)}
                        </ReadMore>
                      </motion.p>
                    </Mask>
                  </Introduction>
                </Text>
              </Content>
              <HiddenCont
                style={{
                  scaleX: open ? 1 : 0,
                  opacity: open ? 1 : 0,
                  zIndex: open ? 2 : -1,
                  transformOrigin: 'top left',
                }}
                variants={variantsText}
                animate={current === order - 1 ? 'show' : 'hidden'}
              >
                <BackButton
                  style={{
                    opacity: open ? 1 : 0,
                    x: open ? 0 : '-100%',
                    zIndex: open ? 1 : -1,
                  }}
                  onClick={() => handleOpen()}
                >
                  {t(`back`)}
                </BackButton>
                <motion.div
                  variants={variantsScale}
                  style={{
                    backgroundColor: 'var(--background)',
                    height: '50vh',
                  }}
                >
                  <motion.p>{description}</motion.p>
                </motion.div>

                <ImageContainer variants={variantsScale}>
                  <Image
                    src={image.responsiveImage.src}
                    alt="image desc"
                    objectFit="cover"
                    layout="fill"
                  />
                </ImageContainer>
              </HiddenCont>
            </motion.div>
          )
        )}
      </Wrapper>
      <ButtonContainer>
        <Button
          variants={variantsButton}
          animate={current > 0 ? 'show' : 'hidden'}
          onClick={() => handleDecrease()}
        >
          <Image src={prev} alt="prev" />
        </Button>
        <Button
          variants={variantsButton}
          animate={current < array.length - 1 ? 'show' : 'hidden'}
          onClick={() => handleIncrease()}
        >
          <Image src={next} alt="next" />
        </Button>
      </ButtonContainer>
    </>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Technology = styled(motion.h2)`
  position: relative;
  display: flex;
  align-items: center;
  :before {
    content: '';
    width: 62px;
    height: 1px;
    margin-right: 1rem;
    background-color: var(--mainColor);
  }
`;
const ReadMore = styled.span`
  white-space: nowrap;
  text-decoration: underline;
  letter-spacing: 1px;
`;
const Background = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  will-change: transform;
  @media only screen and ${device.tablet} {
    min-height: 100vh;
  }
`;
const Introduction = styled(motion.div)`
  transition-duration: 1s;
`;
const Mask = styled(motion.div)`
  position: relative;
  overflow: hidden;
  transition-duration: 1s;
`;
const Title = styled(motion.h1)`
  text-align: right;
  @media only screen and ${device.tablet} {
    text-align: left;
  }
`;

const Content = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  top: 0;
  width: 100%;
  margin-bottom: 7rem;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding: 0 1rem;
`;
const Text = styled(motion.div)`
  transition-duration: 1s;
  position: relative;
  @media only screen and ${device.tablet} {
    margin-left: 50%;
  }
`;
const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  transition-duration: 1s;
  margin: 2rem 0;
  :before {
    content: '';
    width: 62px;
    margin-right: 1rem;
    height: 1px;
    background-color: var(--mainColor);
  }
`;
const HiddenCont = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  padding: 4rem 0 0;
  width: 100%;
  overflow: scroll;
  transition-duration: 1s;
  display: flex;
  flex-direction: column;
  @media only screen and ${device.tablet} {
    flex-direction: row;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;
const Button = styled(motion.button)`
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  border-radius: 50%;
  border: 2px solid var(--mainColor);
  @media only screen and ${device.tablet} {
    width: 65px;
    height: 65px;
  }
`;
export const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 40vh;
  position: relative;
  @media only screen and ${device.tablet} {
  }
`;
