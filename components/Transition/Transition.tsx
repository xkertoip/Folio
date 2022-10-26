import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const variants = {
  in: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};
const Transition = ({ children }: Props) => {
  const { asPath } = useRouter();
  return (
    <div>
      <AnimatePresence mode={'wait'}>
        <motion.div
          key={asPath}
          variants={variants}
          animate={'in'}
          exit={'exit'}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Transition;
