import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
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

  const { scrollY } = useScroll();

  const initial = element.elementTop - window.innerHeight;
  const finish = element.elementTop + element.elementHeight;
  const xRange = useTransform(
    scrollY,
    [initial, finish],
    [0, -element.elementWidth + window.innerWidth]
  );
  const xRangeReverse = useTransform(
    scrollY,
    [initial, finish],
    [-element.elementWidth + window.innerWidth, -75]
  );
  const x = useSpring(reverse ? xRangeReverse : xRange, {
    stiffness: 50,
    mass: 1,
    damping: 30,
  });

  return (
    <motion.div>
      <motion.div style={{ x }} ref={wrapperRef}>
        {array.map((element, i) => {
          return <h2 key={i}> &nbsp;-&nbsp;{element}</h2>;
        })}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxEffect;
/*

const Wrapper = styled.div`
  position: relative;
  padding-top: 1rem;
`;
const Content = styled(motion.div)`
  display: inline-flex;
  flex-direction: row;
  padding: 0 2rem;
  border-width: 1px 0 1px;
  border-style: solid;
  border-color: var(--secondary);
  background-color: var(--background);
  will-change: transform;
  h2 {
    color: var(--secondary);
  }
`;
*/
