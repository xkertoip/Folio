import useDeviceDetect from '../../utils/useDeviceDetect';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const { isMobile } = useDeviceDetect();

  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const handlePosition = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - element.clientWidth / 2,
          y: e.clientY - element.clientHeight / 2,
        });
      };
      window.addEventListener('mousemove', handlePosition);
      return () => {
        window.removeEventListener('mousemove', handlePosition);
      };
    }
  }, []);

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
          ref={ref}
          animate={{
            x: position.x,
            y: position.y,
            scaleX: isHover ? 1.5 : 1,
            scaleY: isHover ? 1.5 : 1,
          }}
          className={
            'fixed left-0 top-0 w-12 h-12 rounded-full 700 z-50 pointer-events-none border-2 border-active'
          }
        />
      )}
    </>
  );
}
