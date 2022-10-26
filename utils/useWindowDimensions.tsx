import { useCallback, useEffect, useState } from 'react';

export default function useWindowDimensions() {
  const [[windowWidth, windowHeight], setWindowDim] = useState<
    [number, number]
  >([0, 0]);

  const handleResize = useCallback(() => {
    setWindowDim([window.innerWidth, window.innerHeight]);
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return { windowHeight, windowWidth };
}
