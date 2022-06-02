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
    y: 0,
    skew: 0,
    rotateZ: 0,
    transition: {
      duration: 0.8,
    },
  },
  hover: {
    y: '-100%',
    skew: 0,
    rotateZ: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function Title({ title, content = '' }: Props) {
  return (
    <Wrapper whileHover="hover" initial="hidden" animate="show">
      <Content variants={variants} content={content !== '' ? content : title}>
        {title}
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  transform-style: preserve-3d;
  overflow: hidden;
`;
const Content = styled(motion.h1)<{ content: string }>`
  :after {
    content: '${({ content }) => content}';
    position: absolute;
    top: 100%;
    left: 0;
    color: var(--color-secondary);
  }
`;
