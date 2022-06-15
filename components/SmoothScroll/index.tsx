import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  ReactNode,
  useEffect,
} from 'react';
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

function SmoothScroll({ children }: Props) {
  const scrollRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);
  const resizePageHeight = useCallback((entries: any) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    if (scrollRef && scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useViewportScroll();
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <Wrapper ref={scrollRef} style={{ y: spring }}>
        {children}
      </Wrapper>
      <div style={{ height: pageHeight }} />
    </>
  );
}

export default SmoothScroll;

const Wrapper = styled(motion.main)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  will-change: transform;
`;
