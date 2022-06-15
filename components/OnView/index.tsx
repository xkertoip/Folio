import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  setIndex: () => void;
};

const item = {
  visible: { opacity: 1, transition: { duration: 0.5 }, staggerChildren: 0.3 },
  hidden: { opacity: 0 },
};

function OnView({ children, setIndex }: Props) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
      setIndex();
    } else {
      control.start('hidden');
      console.log('hidden');
    }
  }, [control, inView]);
  return (
    <Wrapper ref={ref} variants={item} initial="hidden" animate={control}>
      {children}
    </Wrapper>
  );
}

export default OnView;

const Wrapper = styled(motion.section)`
  position: relative;
`;
