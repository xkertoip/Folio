import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

function OnView({ children, setIndex }: Props) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('show');
      if (setIndex) {
        setIndex();
      }
    } else {
      control.start('hidden');
    }
  }, [control, inView]);
  return (
    <Wrapper ref={ref} variants={variants} initial="hidden" animate={control}>
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
