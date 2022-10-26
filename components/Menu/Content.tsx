import { motion } from 'framer-motion';
import List from './List';
import React from 'react';

import Indicator from '../Indicator';
import { useTranslation } from 'next-i18next';

const item = {
  close: {
    opacity: 0,
    translateY: '100%',
    transition: {
      ease: 'linear',
    },
  },
  open: {
    opacity: 1,
    translateY: 0,
    transition: {
      ease: 'linear',
    },
  },
};

export default function Content() {
  const { t } = useTranslation();
  return (
    <>
      <div className={'overflow-hidden'}>
        <Indicator variants={item}>
          N&#176;0
          <br />
          {t('menu')}
        </Indicator>
      </div>
      <nav>
        <List variants={item} />
      </nav>
      <ul className={'pb-4 text-active dark:text-secondary md:text-2xl'}>
        <li className={'overflow-hidden'}>
          <motion.p variants={item}>Kasinka Mała, 648</motion.p>
        </li>
        <li className={'overflow-hidden'}>
          <motion.p variants={item}>
            <motion.a href="tel:+48 536 777 364">+48 536 777 364</motion.a>
          </motion.p>
        </li>
        <li className={'overflow-hidden'}>
          <motion.p variants={item}>Poland</motion.p>
        </li>
      </ul>
    </>
  );
}
