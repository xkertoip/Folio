import React from 'react';
import { MotionValue, useTransform } from 'framer-motion';

type Props = {
  value: MotionValue<number>;
  initial: number;
  finish: number;
};

export const useParallax = ({ value, initial, finish }: Props) => {
  return useTransform(value, [0, 1], [initial, finish]);
};
