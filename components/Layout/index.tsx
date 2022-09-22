import React, { ReactNode, useContext } from 'react';

import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

import { MenuContext } from '../Header/MenuManager';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};
const variantsScale = {
  open: {
    scale: 0.5,
  },
  close: {
    scale: 1,
  },
};
function DefaultLayout({ children, title, description }: Props) {
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
      </motion.div>
    </>
  );
}

export default DefaultLayout;
