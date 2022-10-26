import { ReactNode } from 'react';
import { motion } from 'framer-motion';
type Props = {
  children: ReactNode;
};
const CardShadow = ({ children }: Props) => {
  return (
    <div className={'relative'}>
      <motion.div
        initial={{
          x: 50,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          x: 0,
        }}
        className={
          'shadow-2xl px-4 py-8 sm:px-[10%] bg-primaryLight dark:bg-primaryDark'
        }
      >
        {children}
      </motion.div>
    </div>
  );
};
export default CardShadow;
