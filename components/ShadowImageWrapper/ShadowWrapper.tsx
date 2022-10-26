import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const ShadowImageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      className={`opacity-90 drop-shadow-2xl relative`}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
      }}
    >
      {children}
    </motion.div>
  );
};
export default ShadowImageWrapper;
