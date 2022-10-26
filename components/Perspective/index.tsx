import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import useDeviceDetect from '../../utils/useDeviceDetect';

type Props = {
  children?: ReactNode;
};

const Perspective = ({ children }: Props) => {
  const { isMobile } = useDeviceDetect();
  const elementRef = useRef<HTMLDivElement>(null);
  const [[widthCont, heightCont], setContainer] = useState([200, 200]);
  const x = useMotionValue(widthCont / 2);
  const y = useMotionValue(heightCont / 2);
  const rotateX = useTransform(y, [0, heightCont], [10, -10]);
  const rotateY = useTransform(x, [0, widthCont], [-10, 10]);

  const setupElement = useCallback(() => {
    if (!elementRef?.current) return;
    const { width, height } = elementRef.current.getBoundingClientRect();

    setContainer([width, height]);
  }, []);
  useEffect(() => setupElement(), [setupElement]);

  const handlePosition = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      window.requestAnimationFrame(() => handlePosition);
      const { clientY, clientX } = e;
      const { left, top } = e.currentTarget.getBoundingClientRect();
      x.set(clientX - left);
      y.set(clientY - top);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(widthCont / 2);
    y.set(heightCont / 2);
  }, [x, y]);

  if (!isMobile) {
    return (
      <motion.div
        onMouseMove={handlePosition}
        onMouseLeave={handleLeave}
        className={'perspective-3d'}
      >
        <motion.div
          ref={elementRef}
          style={{
            rotateX,
            rotateY,
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          className={'transform-preserve w-full duration-500 ease-linear'}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }
  return <div>{children}</div>;
};
export default Perspective;
