import { motion, AnimatePresence } from 'framer-motion';
import List from './List';
import React, { useContext } from 'react';
import { MenuContext } from './MenuManager';
import useWindowDimensions from '../../utils/useWindowDimensions';
import SocialMedia from '../SocialMedia';
import { useRouter } from 'next/router';
import Indicator from '../Headings/Indicator';

const variantsContainer = {
  close: {
    scaleY: 0,
    transition: {
      duration: 0.3,
      staggerDirection: -1,
      staggerChildren: 0.1,
      when: 'afterChildren',
    },
  },
  open: {
    scaleY: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const variantsBackground = {
  close: {
    scaleY: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  open: {
    scaleY: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const item = {
  close: { opacity: 0, translateY: '30vh' },
  open: { opacity: 1, translateY: 0 },
};
const header = {
  close: { opacity: 0, translateX: '-100%' },
  open: { opacity: 1, translateX: 0 },
};

function Menu() {
  const { openMenu } = useContext(MenuContext);
  const windowSize = useWindowDimensions();
  return (
    <AnimatePresence>
      {openMenu && (
        <motion.div
          className={
            'fixed bottom-0 left-0 w-[calc(100%-50px)] md:w-[calc(100%-80px)] h-screen origin-bottom bg-active dark:bg-primary/50 z-10 '
          }
          initial="close"
          animate="open"
          exit={'close'}
          variants={variantsBackground}
        >
          <motion.div
            variants={variantsContainer}
            className={
              'fixed left-0 bottom-0 w-[calc(100%-50px)] md:w-[calc(100%-80px)] h-screen origin-bottom bg-primary/50 dark:bg-secondary/50 px-4 md:px-20 py-16 flex '
            }
            style={{
              height: windowSize?.windowHeight,
            }}
          >
            <div
              className={
                'flex-auto flex flex-col justify-between border-b-2 border-secondary dark:border-neutral overflow-hidden'
              }
            >
              <Indicator variants={header}>N&#176;0 Menu</Indicator>

              <nav className={'pl-8'}>
                <List variants={item} />
              </nav>
              <ul className={'pb-4 text-active dark:text-primary md:text-2xl'}>
                <li className={'overflow-hidden'}>
                  <motion.p variants={item}>Kasinka Mała, 648</motion.p>
                </li>
                <li className={'overflow-hidden'}>
                  <motion.p variants={item}>
                    <motion.a href="tel:+48 536 777 364">
                      +48 536 777 364
                    </motion.a>
                  </motion.p>
                </li>
                <li className={'overflow-hidden'}>
                  <motion.p variants={item}>Poland</motion.p>
                </li>
              </ul>
            </div>
            <aside className={'w-12  flex justify-end'}>
              <ul className={'flex w-8 md:w-12 flex-col justify-center gap-4'}>
                <SocialMedia variants={item} />
              </ul>
            </aside>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Menu;
