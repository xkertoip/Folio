import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { device } from '../../styles/mediaQuery';
import Title from './Title';
import Perspective from '../Perspective';

type Props = {
  title: string;
  subtitle?: string;
  content?: string;
  children?: ReactNode;
};

export default function AnimatedSection({
  title,
  subtitle = '',
  content = '',
}: Props) {
  return (
    <Perspective>
      <Title title={title} />
      {subtitle ? <Title title={subtitle} content={content} /> : null}
    </Perspective>
  );
}
