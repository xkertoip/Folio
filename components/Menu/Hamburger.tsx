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

const Hamburger = () => {
  const { openMenu, handleOpen } = useContext(MenuContext);
  return (
    <motion.button
      onClick={handleOpen}
      animate={openMenu ? 'open' : 'close'}
      className={
        ' absolute bottom-4 right-0 z-50 rotate-90 flex justify-center h-12 items-center w-full'
      }
    >
      <div className={'relative w-9 h-4 flex z-[-1]'}>
        <motion.span
          variants={variantsStickFirst}
          className={`top-0 w-full absolute h-0.5 left-0  ${
            openMenu
              ? 'bg-primaryLight '
              : 'bg-primaryDark dark:bg-primaryLight'
          }`}
        />
        <motion.span
          variants={variantsStickLast}
          className={`bottom-0 w-full absolute h-0.5 left-0  ${
            openMenu
              ? 'bg-primaryLight '
              : 'bg-primaryDark dark:bg-primaryLight'
          }`}
        />
      </div>
    </motion.button>
  );
};

export default Hamburger;
