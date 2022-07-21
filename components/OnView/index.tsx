import React, { ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  setIndex?: () => void;
};

const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
    staggerChildren: 0.3,
  },
  hidden: { opacity: 0, y: 50 },
};

function OnView({ children }: Props) {
  return (
    <Wrapper variants={variants} initial="hidden">
      {children}
    </Wrapper>
  );
}

export default OnView;

const Wrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  z-index: 2;
`;
