import { useEffect, useState, useCallback } from 'react';

type Props = {
  min: number;
  max: number;
};

export default function useRandomNumber({ min, max }: Props) {
  const randomNumber = useCallback(() => {
    return Math.floor(Math.random() * (max - min)) + min;
  }, [max, min]);
  const [[currentNumber, isClicked], setStatus] = useState([min, false]);

  const handleClick = (value: number) => {
    setStatus([value, true]);
  };

  useEffect(() => {
    setStatus([currentNumber, false]);
    const interval = setInterval(() => {
      setStatus([randomNumber(), false]);
      if (isClicked) {
        clearInterval(interval);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [randomNumber, isClicked, currentNumber]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus([randomNumber(), isClicked]);
    }, 7000);
    if (!isClicked) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [isClicked, randomNumber]);

  return { currentNumber, handleClick };
}
