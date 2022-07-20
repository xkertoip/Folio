import { useEffect, useState } from 'react';

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState({
    windowWidth: 0,
    windowHeight: 0,
  });
  const handleResize = () => {
    const newWindowHeight = window.innerHeight;
    const newWindowWidth = window.innerWidth;
    setWindowSize({
      windowWidth: newWindowWidth,
      windowHeight: newWindowHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}
