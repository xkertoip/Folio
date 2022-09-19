import React, { ReactNode, useEffect } from 'react';
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
  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <div>
        <h2>Projekty</h2>
        {children}
      </div>
    </>
  );
}

export default ProjectLayout;

const Wrapper = styled(motion.div)``;
