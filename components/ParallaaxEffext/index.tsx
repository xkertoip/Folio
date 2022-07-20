import styled from 'styled-components';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useRef } from 'react';
import useWindowDimensions from '../../utils/useWindowDimensions';
import useElementProperties from '../../utils/useElementProperties';

type Props = {
  array: string[];
  reverse?: boolean;
};

export default function ParallaxEffect({ array, reverse }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { elementHeight, elementTop, elementWidth } = useElementProperties({
    wrapperRef,
  });
  const { windowWidth, windowHeight } = useWindowDimensions();

  const { scrollY } = useViewportScroll();

  const initial = elementTop + elementHeight - windowHeight;
  const finish = elementTop;

  const xRange = useTransform(
    scrollY,
    [initial, finish],
    [0, -elementWidth + windowWidth]
  );
  const xRangeReverse = useTransform(
    scrollY,
    [initial, finish],
    [-elementWidth + windowWidth, 0]
  );
  const x = useSpring(reverse ? xRangeReverse : xRange, {
    stiffness: 50,
    damping: 30,
  });

  return (
    <Wrapper>
      <Content style={{ x }} ref={wrapperRef} initial={{ x: 0 }}>
        <h1>
          {array.map((element, i) => {
            return <span key={i}> &nbsp;-&nbsp;{element}</span>;
          })}
        </h1>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Content = styled(motion.div)`
  display: inline-block;
  flex-direction: row;
  padding: 2rem;
  will-change: transform;

  h1 {
    span {
      white-space: nowrap;
    }
  }
`;
