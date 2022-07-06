import styled from 'styled-components';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = {
  array: string[];
  reverse?: boolean;
};

export default function ParallaxEffect({ array, reverse }: Props) {
  const [wrapperDim, setWrapperDim] = useState({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    screen: 0,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useViewportScroll();

  const initial = wrapperDim.bottom - wrapperDim.screen;
  const finish = wrapperDim.top;

  const xRange = useTransform(
    scrollY,
    [initial, finish],
    [0, -wrapperDim.width]
  );
  const xRangeReverse = useTransform(
    scrollY,
    [initial, finish],
    [-wrapperDim.width, 0]
  );
  const x = useSpring(reverse ? xRangeReverse : xRange, {
    stiffness: 30,
    damping: 50,
  });

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      const element = wrapperRef.current;
      const onResize = () => {
        setWrapperDim({
          width: element.clientWidth - window.innerWidth,
          height: element.clientHeight,
          screen: window.innerHeight,
          top:
            element.getBoundingClientRect().top + window.scrollY ||
            window.pageYOffset,
          bottom:
            element.getBoundingClientRect().bottom + window.scrollY ||
            window.pageYOffset,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, [wrapperRef]);

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
