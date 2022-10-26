import { ReactNode, useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  randomNumber: number;
  number: number;
};

export default function Wrapper({ children, randomNumber, number }: Props) {
  const controls = useAnimation();
  useEffect(() => {
    if (randomNumber === number) {
      controls.start({
        rotateY: 180,
        transition: { duration: 3 },
      });
    }
  }, [randomNumber, number, controls]);

  return (
    <motion.div
      className={'relative'}
      animate={controls}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
