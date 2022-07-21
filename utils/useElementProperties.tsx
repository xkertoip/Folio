import { RefObject, useEffect, useState } from 'react';

type Props = {
  wrapperRef: RefObject<HTMLDivElement>;
};

export default function useElementProperties({ wrapperRef }: Props) {
  const [elementProperties, setElementProperties] = useState({
    elementTop: 0,
    elementHeight: 0,
    elementWidth: 0,
  });

  useEffect(() => {
    const element = wrapperRef.current;
    const getElementSize = () => {
      if (element) {
        const newElementTop =
          element.getBoundingClientRect().top + window.scrollY ||
          window.pageYOffset;
        const newElementWidth = element.clientWidth;
        const newElementHeight = element.clientHeight;
        setElementProperties({
          elementTop: newElementTop,
          elementWidth: newElementWidth,
          elementHeight: newElementHeight,
        });
      }
    };
    getElementSize();
    window.addEventListener('resize', getElementSize);
    return () => window.removeEventListener('resize', getElementSize);
  }, [wrapperRef]);

  return elementProperties;
}
