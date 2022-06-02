import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import PageTitle from './PageTitle';

const widthWindow = typeof window !== 'undefined' && window.innerWidth;

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

/*const variants = {
  hidden: { opacity: 0, x: '100%', y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: '100%', y: 0 },
};*/

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

function Layout({ children, title, description }: Props) {
  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="hidden"
        transition={{ type: 'linear' }}
      >
        {children}
      </motion.main>
    </div>
  );
}

export default Layout;
