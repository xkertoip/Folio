import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const variants = {
  hidden: {
    opacity: 0,
    y: '100%',
    transition: {
      staggerChildren: 0.15,
    },
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function ProjectLayout({ children, title, description }: Props) {
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
        style={{
          backgroundColor: 'black',
        }}
      >
        {children}
      </Wrapper>
    </>
  );
}

export default ProjectLayout;

const Wrapper = styled(motion.div)``;
