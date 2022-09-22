import Hamburger from './Hamburger';
import Menu from './Menu';
import { motion } from 'framer-motion';

const variants = {
  init: {
    y: '100%',
  },
  animate: {
    y: 0,
  },
};

function Header() {
  return (
    <>
      <motion.div
        className={
          'fixed bottom-0 z-50 w-full flex justify-center h-16 items-center'
        }
        initial={'init'}
        animate={'animate'}
        variants={variants}
      >
        <Hamburger />
      </motion.div>

      <Menu />
    </>
  );
}

export default Header;
