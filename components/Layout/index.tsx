import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Background from '../Background';
import Footer from '../Footer';
import SmoothScroll from '../SmoothScroll';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const variants = {
  in: {
    opacity: 0,
    y: 100,
    transition: {
      delay: 0.5,
      ease: 'easeInOut',
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  out: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 1,
      ease: 'easeInOut',
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
      {/*      <Wrapper
        key={asPath}
        variants={variants}
        animate="inactive"
        initial="in"
        exit="out"
        transition={{ type: 'linear' }}
      >*/}
      {children}
    </>
  );
}

export default DefaultLayout;

const Wrapper = styled(motion.div)`
  position: relative;
`;
