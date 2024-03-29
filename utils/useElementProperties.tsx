import { RefObject, useEffect, useState } from 'react';

type Props = {
  wrapperRef: RefObject<HTMLDivElement>;
};

interface Size {
  elementTop: number;
  elementHeight: number;
  elementWidth: number;
}

export default function useElementProperties({ wrapperRef }: Props) {
  const [elementProperties, setElementProperties] = useState<Size>({
    elementTop: 0,
    elementHeight: 0,
    elementWidth: 0,
  });

  useEffect(() => {
    const element = wrapperRef.current;
    const onResize = () => {
      if (element) {
        setElementProperties({
          elementHeight: element.clientHeight,
          elementTop:
            element.getBoundingClientRect().top + window.scrollY ||
            window.pageYOffset,
          elementWidth: element.clientWidth,
        });
      }
    };
    onResize();

    window.addEventListener('resize', () => onResize());
    return () => window.removeEventListener('resize', () => onResize());
  }, [wrapperRef]);

  return elementProperties;
}
