import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { device } from '../../styles/mediaQuery';
import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Slider({ children }: Props) {
  return (
    <Wrapper>
      <List role="list">{children}</List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  overflow: scroll;
  overflow-y: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and ${device.tablet} {
  }
`;

const List = styled(motion.div)`
  display: inline-flex;
  gap: 2rem;
  padding: 1rem;
`;

export const Slide = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--background);
  border-top: 2px solid var(--specialColor);
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  @media only screen and ${device.tablet} {
    flex-direction: row;
  }
`;
export const ItemContent = styled.a`
  width: 70vw;
  @media only screen and ${device.tablet} {
    width: 300px;
  }
`;

export const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 40vh;
  position: relative;
  @media only screen and ${device.tablet} {
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
const Line = styled.div`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mainColor);
  position: relative;
`;
