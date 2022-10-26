import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useElementProperties from '../../../utils/useElementProperties';
import { useParallax } from '../../../utils/useParallax';

type Props = {
  array: string[];
  reverse?: boolean;
};

const ParallaxEffect = ({ array, reverse }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState({
    initial: elementRef.current?.clientTop,
    finish: elementRef.current?.clientHeight,
  });

  const { scrollYProgress } = useScroll({ target: elementRef });
  const newParallax = useParallax(scrollYProgress);
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const start = element.clientTop - window.innerHeight;
      const end = element.clientTop + window.innerHeight + element.clientHeight;
      setDistance({ initial: start, finish: end });
    }
  }, [elementRef]);
  /*  const element = useElementProperties({
    wrapperRef,
  });*/

  /*  const { scrollY } = useScroll();*/

  /*  const initial = element.elementTop - window.innerHeight;
  const finish =
    element.elementTop + element.elementHeight + window.innerHeight;
  const xRange = useTransform(
    scrollY,
    [initial, finish],
    [0, -element.elementWidth + window.innerWidth]
  );
  const xRangeReverse = useTransform(
    scrollY,
    [initial, finish],
    [-element.elementWidth + window.innerWidth, -75]
  );*/
  /*  const x = useSpring(reverse ? xRangeReverse : xRange, {
    stiffness: 50,
    mass: 1,
    damping: 30,
  });*/

  return (
    <motion.div className={'relative pt-4 -skew-y-12 overflow-hidden'}>
      <div className={'border-neutral border-y py-4 '}>
        <motion.div
          className={'inline-flex '}
          style={{ x: newParallax }}
          ref={elementRef}
        >
          {array.map((element, i) => (
            <h2
              key={i}
              className={
                'flex-shrink-0 font-Candal text-5xl uppercase tracking-[8px]'
              }
            >
              {' '}
              &nbsp;-&nbsp;{element}
            </h2>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ParallaxEffect;
