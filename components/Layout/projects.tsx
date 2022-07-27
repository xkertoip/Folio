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
    x: '100%',
    transition: {
      staggerChildren: 0.15,
    },
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function ProjectsLayout({ children, title, description }: Props) {
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
        {children}
      </Wrapper>
    </>
  );
}

export default ProjectsLayout;

const Wrapper = styled(motion.div)``;
