import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}
const CustomCursor = ({ speed = 0.1 }) => {
  const mainCursor = useRef<HTMLDivElement>(null);
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    const handlePosition = (e: MouseEvent) => {
      if (positionRef.current && mainCursor.current) {
        if (
          e.target instanceof HTMLAnchorElement ||
          e.target instanceof HTMLHeadingElement ||
          e.target instanceof HTMLImageElement
        ) {
          mainCursor.current.style.width = `125px`;
          mainCursor.current.style.height = `125px`;
        } else {
          mainCursor.current.style.width = `75px`;
          mainCursor.current.style.height = `75px`;
        }

        if (!visible) setVisibility(true);

        const { clientX, clientY } = e;

        const mouseX = clientX;
        const mouseY = clientY;
        positionRef.current.mouseX =
          mouseX - mainCursor.current.clientWidth / 2;
        positionRef.current.mouseY =
          mouseY - mainCursor.current.clientHeight / 2;
      }
    };
    document.addEventListener('mousemove', handlePosition);

    return () => {
      document.removeEventListener('mousemove', handlePosition);
    };
  }, []);

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = lerp(0, mouseX, 0.2);
        positionRef.current.destinationY = lerp(0, mouseY, 0.2);
      } else {
        positionRef.current.distanceX = lerp(destinationX, mouseX, 0.2);
        positionRef.current.distanceY = lerp(destinationY, mouseY, 0.2);
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX = distanceX;
          positionRef.current.destinationY = distanceY;
        }
      }
      if (mainCursor && mainCursor.current)
        mainCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
    };
    followMouse();
  }, [speed]);

  return (
    <Wrapper>
      <Content ref={mainCursor} />
    </Wrapper>
  );
};

export default CustomCursor;

export const Wrapper = styled.div``;

export const Content = styled.div`
  position: fixed;
  pointer-events: none;
  background-color: white;
  mix-blend-mode: difference;
  left: 0;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
`;
