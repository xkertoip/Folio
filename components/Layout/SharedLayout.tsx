import React, { ReactNode, useContext } from 'react';

import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

import { MenuContext } from '../Menu/MenuManager';
import Footer from '../Footer';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};
const variantsScale = {
  open: {
    scale: 0.9,
  },
  close: {
    scale: 1,
  },
};
const SharedLayout = ({ children, title, description }: Props) => {
  const { openMenu } = useContext(MenuContext);
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />

      <motion.div
        variants={variantsScale}
        initial={'close'}
        animate={openMenu ? 'open' : 'close'}
        transition={{
          duration: 1,
        }}
      >
        {children}
        <Footer />
      </motion.div>
    </>
  );
};
export default SharedLayout;
