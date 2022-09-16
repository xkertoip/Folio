import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Indicator = styled.span`
  color: var(--secondary);
  margin: 0;
  position: absolute;
  font-family: CaudexItalic, sans-serif;
  z-index: 2;
  bottom: 0;
  left: 50%;
  text-align: left;
  font-size: 1.5rem;
  transform: translate(-50%, -25%);
  white-space: nowrap;
`;

export const SectionTitle = styled(motion.h2)`
  position: relative;
`;
