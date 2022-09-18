import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Background from '../Background';
import Footer from '../Footer';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
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
      <Wrapper
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="hidden"
        transition={{ type: 'linear' }}
      >
        <SmoothScrollWithoutSSR>{children}</SmoothScrollWithoutSSR>
      </Wrapper>
    </>
  );
}

export default DefaultLayout;

const Wrapper = styled(motion.div)`
  position: relative;
`;
