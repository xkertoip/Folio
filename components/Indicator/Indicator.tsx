import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  variants?: {};
  align?: 'right' | 'left' | 'center';
};

const Indicator = ({ children, variants, align }: Props) => {
  return (
    <motion.header
      variants={variants}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: 'easeIn',
      }}
      className={`text-primaryDark dark:text-primaryLight text-base  font-CaudexItalic sm:text-xl tracking-[5px] uppercase text-${align}`}
    >
      <h1>{children}</h1>
    </motion.header>
  );
};

export default Indicator;
