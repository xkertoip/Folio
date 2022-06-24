import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}
const CustomCursor = ({ speed = 0.1 }) => {
  const mainCursor = useRef<HTMLDivElement>(null);
  const secondCursor = useRef<HTMLDivElement>(null);
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
      const { clientX, clientY } = e;
      if (positionRef.current && mainCursor.current) {
        if (!visible) setVisibility(true);

        const mouseX = clientX;
        const mouseY = clientY;
        positionRef.current.mouseX =
          mouseX - mainCursor.current.clientWidth / 2;
        positionRef.current.mouseY =
          mouseY - mainCursor.current.clientHeight / 2;
        if (
          e.target instanceof HTMLAnchorElement ||
          e.target instanceof HTMLHeadingElement ||
          e.target instanceof HTMLImageElement ||
          e.target instanceof HTMLButtonElement
        ) {
          /* mainCursor.current.style.transform = `translate3d(${positionRef.current.mouseX}px, ${positionRef.current.mouseY}px, 0)`;*/
          mainCursor.current.style.transform = `translate3d(${positionRef.current.mouseX}px, ${positionRef.current.mouseY}px, 0) scale(1.5)`;
        } else {
          mainCursor.current.style.transform = `translate3d(${positionRef.current.mouseX}px, ${positionRef.current.mouseY}px, 0) scale(1)`;
        }
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
        positionRef.current.destinationX = lerp(0, mouseX, 0.4);
        positionRef.current.destinationY = lerp(0, mouseY, 0.4);
      } else {
        positionRef.current.distanceX = lerp(destinationX, mouseX, 0.4);
        positionRef.current.distanceY = lerp(destinationY, mouseY, 0.4);
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
      if (secondCursor && secondCursor.current) {
        secondCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
    };
    followMouse();
  }, [speed]);

  return (
    <div>
      <MainCursor ref={mainCursor} />
      <SecondCursor ref={secondCursor} />
    </div>
  );
};

export default CustomCursor;

export const MainCursor = styled.div`
  position: fixed;
  pointer-events: none;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  mix-blend-mode: difference;
  background-color: white;
  transition: 0.1s linear;
  z-index: 1000;
`;

export const SecondCursor = styled.div`
  position: fixed;
  pointer-events: none;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  mix-blend-mode: saturation;
  background-color: var(--specialColor);
  transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 1000;
`;
