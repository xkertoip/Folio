import useDeviceDetect from '../../utils/useDeviceDetect';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const { isMobile } = useDeviceDetect();
  const elementRef = useRef<HTMLDivElement>(null);

  const [[x, y], setPosition] = useState([0, 0]);
  const [isHover, setIsHover] = useState(false);

  const handlePosition = useCallback((e: MouseEvent) => {
    const { clientY, clientX } = e;
    const element = elementRef.current;
    if (element) {
      setPosition([
        clientX - element.clientWidth / 2,
        clientY - element.clientHeight / 2,
      ]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handlePosition);
    return () => {
      window.removeEventListener('mousemove', handlePosition);
    };
  }, [handlePosition]);

  useEffect(() => {
    const handleTarget = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLAnchorElement ||
        e.target instanceof HTMLImageElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLHeadingElement
      ) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };
    window.addEventListener('mousemove', handleTarget);
    return () => {
      window.removeEventListener('mousemove', handleTarget);
    };
  }, [isHover]);

  return (
    <>
      {!isMobile && (
        <motion.div
          ref={elementRef}
          animate={{
            x,
            y,
            scaleX: isHover ? 1.5 : 1,
            scaleY: isHover ? 1.5 : 1,
          }}
          className={
            'fixed left-0 top-0 w-12 h-12 rounded-full 700 z-50 pointer-events-none border-2 border-secondary'
          }
        />
      )}
    </>
  );
};

export default CustomCursor;
