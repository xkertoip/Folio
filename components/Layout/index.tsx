import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import SmoothScroll from '../SmoothScroll';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function DefaultLayout({ children, title, description }: Props) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <SmoothScroll>
        <Wrapper
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          transition={{ type: 'linear' }}
        >
          {children}
        </Wrapper>
      </SmoothScroll>
    </>
  );
}

export default DefaultLayout;

const Wrapper = styled(motion.main)`
  position: relative;
  isolation: isolate;
  :before,
  :after {
    content: '';
    width: 0.5px;
    min-height: 100%;
    background-color: var(--secondary);
    position: fixed;
    top: 0;
    z-index: -1;
  }
  :before {
    right: 15%;
  }
  :after {
    right: 45%;
  }
`;
