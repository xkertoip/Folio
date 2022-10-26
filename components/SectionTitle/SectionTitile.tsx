import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  align?: 'right' | 'center' | 'left';
};

export default function SectionTitle({ children, align }: Props) {
  return (
    <motion.h1
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: 'easeIn',
      }}
      className={`text-4xl sm:text-5xl lg:text-6xl text-primaryDark dark:text-primaryLight font-CaudexItalic text-${align}`}
    >
      {children}
    </motion.h1>
  );
}
