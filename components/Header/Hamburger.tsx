import { motion } from 'framer-motion';
import { useContext } from 'react';
import { MenuContext } from './MenuManager';

const variantsStickFirst = {
  open: {
    rotate: -45,
    top: '50%',
    translateY: '-50%',
  },
  close: {
    rotate: 0,
  },
};
const variantsStickLast = {
  open: {
    rotate: 45,
    top: '50%',
    translateY: '-50%',
  },
  close: {
    rotate: 0,
  },
};
const variantsStickMiddle = {
  open: {
    translateX: '100%',
    translateY: '-50%',
    opacity: 0,
  },
  close: {
    rotate: 0,
    opacity: 1,
    translateY: '-50%',
    translateX: 0,
  },
};

const Hamburger = () => {
  const { openMenu, handleOpen } = useContext(MenuContext);
  return (
    <motion.button
      onClick={handleOpen}
      animate={openMenu ? 'open' : 'close'}
      className={'w-9 h-5 flex relative'}
    >
      <motion.span
        variants={variantsStickFirst}
        className={
          'top-0 w-full absolute h-0.5 left-0 bg-secondary dark:bg-neutral'
        }
      />
      <motion.span
        variants={variantsStickLast}
        className={
          'bottom-0 w-full absolute h-0.5 left-0 bg-secondary dark:bg-neutral '
        }
      />
      <motion.span
        variants={variantsStickMiddle}
        className={
          'top-1/2 w-full translate-y-[-50%] absolute h-0.5 left-0 bg-secondary dark:bg-neutral'
        }
      />
    </motion.button>
  );
};

export default Hamburger;
