import styled from 'styled-components';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  content?: string;
};

const variants = {
  hidden: {
    y: '50vh',
    skew: 15,
    rotateZ: 25,
  },
  show: {
    x: 0,
    y: 0,
    skew: [0, 5, 0],
    rotateZ: [0, 5, 0],
    transition: {
      duration: 0.8,
    },
  },
  hover: {
    x: ['0%', '100%'],
    skew: [0, 5, 0],
    rotateZ: [0, 5, 0],
    transition: {
      duration: 0.8,
    },
  },
};

export default function Title({ title, content = '' }: Props) {
  return (
    <Wrapper
      whileHover="hover"
      initial="hidden"
      animate="show"
      whileTap="hover"
    >
      <Content variants={variants} title={title} content={content}>
        {title}
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  transform-style: preserve-3d;
  overflow: hidden;
`;
const Content = styled(motion.h1)<Props>`
  text-transform: uppercase;

  color: var(${(p) => (p.content !== '' ? '--specialColor' : '--mainColor')});
  :after {
    content: '${(p) => (p.content !== '' ? p.content : p.title)}';
    color: var(${(p) => (p.content !== '' ? '--mainColor' : '--specialColor')});
    position: absolute;
    top: 0;
    right: 100%;
    width: 100%;
  }
`;
