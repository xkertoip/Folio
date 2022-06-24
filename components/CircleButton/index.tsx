import styled from 'styled-components';
import Link from 'next/link';
import { ReactNode, useRef } from 'react';
import {
  useSpring,
  useViewportScroll,
  motion,
  useTransform,
} from 'framer-motion';
import { device } from '../../styles/mediaQuery';

type Props = {
  href: string;
  children?: ReactNode;
};

const variants = {};

export default function CircleButton({ children, href }: Props) {
  const { scrollYProgress } = useViewportScroll();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const physicsOutline = { damping: 25, mass: 1, stiffness: 75 };
  const physicsContent = { damping: 25, mass: 1, stiffness: 100 };
  const springOutline = useSpring(scrollYProgress, physicsOutline);
  const springContent = useSpring(scrollYProgress, physicsContent);
  const transformOutline = useTransform(springOutline, [0, 1], ['-25%', '25%']);
  const transformContent = useTransform(springContent, [0, 1], ['-25%', '25%']);

  return (
    <Wrapper ref={wrapperRef}>
      <Link href={href}>
        <motion.a>
          <Content style={{ y: transformContent }}>{children}</Content>
          <CircleOutline style={{ y: transformOutline }} />
        </motion.a>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  margin: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 80vw;
    min-height: 80vw;
    border-radius: 50%;
    border-color: var(--mainColor);
    border-width: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media only screen and ${device.tablet} {
    margin: 8rem 0;
    a {
      max-width: 40vw;
      min-height: 40vw;
    }
  }
`;
const CircleOutline = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: var(--mainColor);
`;

const Content = styled(motion.div)`
  text-align: center;
`;
