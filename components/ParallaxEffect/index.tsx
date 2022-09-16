import styled from 'styled-components';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useRef } from 'react';
import useElementProperties from '../../utils/useElementProperties';

type Props = {
  array: string[];
  reverse?: boolean;
};

const ParallaxEffect = ({ array, reverse }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const element = useElementProperties({
    wrapperRef,
  });

  const { scrollY } = useViewportScroll();

  const initial = element.elementTop - window.innerHeight;
  const finish = element.elementTop;
  const xRange = useTransform(
    scrollY,
    [initial, finish],
    [0, -element.elementWidth + window.innerWidth]
  );
  const xRangeReverse = useTransform(
    scrollY,
    [initial, finish],
    [-element.elementWidth + window.innerWidth, 0]
  );
  const x = useSpring(reverse ? xRangeReverse : xRange, {
    stiffness: 50,
    damping: 30,
  });

  return (
    <Wrapper>
      <Content style={{ x }} ref={wrapperRef}>
        {array.map((element, i) => {
          return <h2 key={i}> &nbsp;-&nbsp;{element}</h2>;
        })}
      </Content>
    </Wrapper>
  );
};

export default ParallaxEffect;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Content = styled(motion.div)`
  display: inline-flex;
  flex-direction: row;
  will-change: transform;
  padding: 0 2rem;
`;
