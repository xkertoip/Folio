import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
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

const SmoothScrollWithoutSSR = dynamic(() => import('../SmoothScroll'), {
  ssr: false,
});

function DefaultLayout({ children, title, description }: Props) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <SmoothScrollWithoutSSR>
        <Wrapper
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          transition={{ type: 'linear' }}
        >
          {children}
        </Wrapper>
      </SmoothScrollWithoutSSR>
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
