import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';

const variantsStickFirst = {
  open: {
    rotate: -45,
    top: '50%',
    translateY: '-50%',
  },
  close: {
    rotate: 0,
  },
};
const variantsStickLast = {
  open: {
    rotate: 45,
    top: '50%',
    translateY: '-50%',
  },
  close: {
    rotate: 0,
  },
};
const variantsStickMiddle = {
  open: {
    translateX: '100%',
    translateY: '-50%',
    opacity: 0,
  },
  close: {
    rotate: 0,
    opacity: 1,
    translateY: '-50%',
    translateX: 0,
  },
};

const Hamburger = () => {
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  return (
    <Wrapper>
      <Button
        data-open={JSON.stringify(openMenu)}
        onClick={setOpenMenu}
        animate={openMenu ? 'open' : 'close'}
      >
        <Stick variants={variantsStickFirst} />
        <Stick variants={variantsStickMiddle} />
        <Stick variants={variantsStickLast} />
      </Button>
    </Wrapper>
  );
};

export default Hamburger;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 1rem;
  left: 50%;
  background: transparent;
  transform: translateX(-50%);
  z-index: 300;
`;

export const Button = styled(motion.button)`
  width: 36px;
  height: 18px;
  position: relative;
  span:first-child {
    top: 0;
    left: 0;
  }
  span:nth-child(2) {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  span:last-child {
    bottom: 0;
    left: 0;
  }
`;

export const Stick = styled(motion.span)`
  width: 100%;
  height: 2px;
  background-color: var(--secondary);
  position: absolute;
`;
