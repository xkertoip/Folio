import { useEffect, useState } from 'react';

interface Size {
  windowWidth: number | undefined;
  windowHeight: number | undefined;
}

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState<Size>({
    windowWidth: undefined,
    windowHeight: undefined,
  });
  const handleResize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}
