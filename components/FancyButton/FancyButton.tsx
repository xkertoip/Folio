import { motion } from 'framer-motion';
import Image from 'next/image';
import { ComponentPropsWithoutRef } from 'react';

const icon = require('/images/arrowRight.svg');

type NewProps = ComponentPropsWithoutRef<'button'>;

const variants = {
  hover: {
    x: [0, 30],
  },
  off: {
    x: [0],
  },
};

const FancyButton = ({ children, type, onClick }: NewProps) => {
  return (
    <motion.button
      onClick={onClick}
      type={type}
      whileHover={'hover'}
      variants={variants}
      className={
        ' text-primaryDark text-xl py-4 dark:text-primaryLight font-CaudexItalic relative after:absolute after:w-[40px] after:h-[40px] after:left-[0]  after:top-[50%] after:-translate-y-[50%] after:rounded-full after:border after:border-secondary  after:animate-pulse hover:after:scale-150 after:duration-700 flex flex items-center '
      }
    >
      {children}
      <motion.div className={'min-w-[30px] animate-pulse'} variants={variants}>
        <Image
          src={icon}
          alt={'arrow'}
          layout={'responsive'}
          objectFit={'contain'}
        />
      </motion.div>
    </motion.button>
  );
};
export default FancyButton;
