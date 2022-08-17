import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import React, { useState } from 'react';
import { device } from '../../styles/mediaQuery';
import Image from 'next/image';
const next = require('/images/next.svg');
const prev = require('/images/prev.svg');
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
    transition: {
      duration: 1,
      when: 'afterChildren',
    },
  },
  visible: {
    transition: {
      duration: 1,
      when: 'afterChildren',
    },
  },
};
const variantContent = {
  hidden: {
    opacity: 0,
    zIndex: -1,
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    opacity: 1,
    zIndex: 1,
  },
};

const variantsView = {
  open: {
    opacity: 1,
    zIndex: 1,
    transition: {
      when: 'afterChildren',
    },
  },
  close: {
    opacity: 0,
    zIndex: -1,
  },
};
const variantsText = {
  hidden: (direction: number) => {
    return {
      y: direction >= 0 ? '100%' : '-100%',
      transition: {
        duration: 1,
      },
    };
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
    },
  },
  open: {
    x: -100,
  },
  close: {
    x: 0,
  },
};
const variantsOpen = {
  close: {
    x: 0,
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
  const [[transition, direction], setTransition] = useState([0, 0]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('common');

  const handleIncrease = () => {
    if (current < array.length - 1) {
      setTransition([transition - window.innerHeight, -1]);
      setCurrent(current + 1);
      console.log(transition);
    }
  };
  const handleDecrease = () => {
    if (current > 0) {
      setTransition([transition + window.innerHeight, 1]);
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
            <Item
              animate={current === order - 1 ? 'visible' : 'hidden'}
              key={id}
              variants={variantContent}
            >
              <Background variants={variantsText} custom={direction}>
                <Image
                  src={image.responsiveImage.src}
                  alt="pictureProject"
                  layout="fill"
                  objectFit="contain"
                  objectPosition={open ? 'top left' : 'top right'}
                  style={{
                    transitionDuration: '1s',
                  }}
                />
              </Background>
              <Aside animate={open ? 'open' : 'close'}>
                <Mask>
                  <motion.h1
                    variants={variantsText}
                    custom={direction}
                    animate={current === order - 1 ? 'visible' : 'hidden'}
                  >
                    {order}
                  </motion.h1>
                </Mask>
                <BackButton
                  onClick={() => handleOpen()}
                  variants={variantsView}
                >
                  {t(`back`)}
                </BackButton>
              </Aside>
              <View>
                <MainView
                  variants={variantsView}
                  animate={open ? 'close' : 'open'}
                >
                  <motion.div>
                    <ReadMore onClick={() => handleOpen()}>
                      {t(`readMore`)}
                    </ReadMore>
                  </motion.div>
                </MainView>
                <SecondView
                  variants={variantsView}
                  animate={open ? 'open' : 'close'}
                >
                  {description}
                </SecondView>
              </View>
            </Item>
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
const MainView = styled(motion.div)``;
const View = styled(motion.div)`
  position: relative;
`;
const ReadMore = styled.span`
  white-space: nowrap;
  text-decoration: underline;
  letter-spacing: 1px;
`;
const Background = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  will-change: transform;
`;
const Aside = styled(motion.div)`
  @media only screen and ${device.tablet} {
    width: 20%;
  }
`;
const Introduction = styled(motion.div)`
  transition-duration: 1s;
`;
const Mask = styled(motion.div)`
  position: relative;
  overflow: hidden;
`;
const Title = styled(motion.h1)`
  text-align: right;
  @media only screen and ${device.tablet} {
    text-align: left;
  }
`;

const Item = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 4rem 1rem 0;
  display: flex;
  flex-direction: column;
  @media only screen and ${device.tablet} {
    flex-direction: row;
  }
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
  position: relative;
  margin: 2rem 0;
  :before {
    content: '';
    width: 62px;
    margin-right: 1rem;
    height: 1px;
    background-color: var(--mainColor);
  }
`;
const SecondView = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
  z-index: 2;
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

/* <Mask>
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

                      </motion.p>
                    </Mask>
                  </Introduction>
                </Text>*/
/*            <HiddenCont
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
              </HiddenCont>*/
