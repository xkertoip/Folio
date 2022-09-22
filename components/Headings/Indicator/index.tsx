import { motion } from 'framer-motion';

type Props = {
  children: string;
  variants?: {};
};

function Indicator({ children, variants }: Props) {
  return (
    <motion.header
      variants={variants}
      className={'text-neutral text-base py-4 font-CaudexItalic'}
    >
      <h1>{children}</h1>
    </motion.header>
  );
}

export default Indicator;
