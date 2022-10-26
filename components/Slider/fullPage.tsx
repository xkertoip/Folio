import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import React, { useState } from 'react';
import Image from 'next/image';
const next = require('/images/next.svg');
const prev = require('/images/prev.svg');
import { useTranslation } from 'next-i18next';
import ShadowImageWrapper from '../ShadowImageWrapper';

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
      <div className={'flex flex-col overflow-hidden'}>
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
            <motion.div
              className={' overflow-hidden p-4 flex flex-col'}
              animate={current === order - 1 ? 'visible' : 'hidden'}
              key={id}
              variants={variantContent}
            >
              <motion.div
                className={'flex justify-end w-full h-full'}
                variants={variantsText}
                custom={direction}
              >
                <ShadowImageWrapper
                  src={image.responsiveImage.src}
                  alt="pictureProject"
                />
              </motion.div>
              <motion.aside animate={open ? 'open' : 'close'}>
                <div className={'relative overflow-hidden'}>
                  <motion.h1
                    variants={variantsText}
                    custom={direction}
                    animate={current === order - 1 ? 'visible' : 'hidden'}
                  >
                    {order}
                  </motion.h1>
                </div>
                <motion.button
                  className={'flex items-center m-8 relative'}
                  onClick={() => handleOpen()}
                  variants={variantsView}
                >
                  {t(`back`)}
                </motion.button>
              </motion.aside>
              <div className={'relative'}>
                <motion.div
                  variants={variantsView}
                  animate={open ? 'close' : 'open'}
                >
                  <motion.div>
                    <div
                      className={'whitespace-nowrap underline tracking-[1px]'}
                      onClick={() => handleOpen()}
                    >
                      {t(`readMore`)}
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div
                  variants={variantsView}
                  animate={open ? 'open' : 'close'}
                  className={'absolute top-0 left-0 w-full flex flex-col'}
                >
                  {description}
                </motion.div>
              </div>
            </motion.div>
          )
        )}
      </div>
      <div
        className={'absolute bottom-8 right-8 flex justify-between gap-8 z-[2]'}
      >
        <motion.button
          variants={variantsButton}
          animate={current > 0 ? 'show' : 'hidden'}
          onClick={() => handleDecrease()}
        >
          <ShadowImageWrapper src={prev} alt="prev" />
        </motion.button>
        <motion.button
          variants={variantsButton}
          animate={current < array.length - 1 ? 'show' : 'hidden'}
          onClick={() => handleIncrease()}
        >
          <ShadowImageWrapper src={next} alt="next" />
        </motion.button>
      </div>
    </>
  );
}

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
