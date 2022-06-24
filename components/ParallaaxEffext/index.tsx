import styled from 'styled-components';
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion';

type Props = {
  array: string[];
};

export default function ParallaxEffect({ array }: Props) {
  const { scrollYProgress } = useViewportScroll();
  const physics = { damping: 25, mass: 1, stiffness: 75 };
  const springLeft = useSpring(scrollYProgress, physics);
  const transformLeft = useTransform(springLeft, [0, 1], ['-50%', '10%']);
  const transformRight = useTransform(springLeft, [0, 1], ['0', '-50%']);

  return (
    <Wrapper>
      <Line />
      <Content style={{ x: transformLeft }}>
        <h1>
          {array.map((element, i) => {
            return <span key={i}> &nbsp;-&nbsp;{element}</span>;
          })}
        </h1>
      </Content>
      <Line />
      <Content style={{ x: transformRight }}>
        <h1>
          {array.reverse().map((element, i) => {
            return <span key={i}> &nbsp;-&nbsp;{element}</span>;
          })}
        </h1>
      </Content>
      <Line />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Content = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  will-change: transform;

  h1 {
    span {
      white-space: nowrap;
    }
  }
`;
const Line = styled.div`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mainColor);
`;
