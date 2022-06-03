import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';

const Hamburger = () => {
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  return (
    <Wrapper data-open={JSON.stringify(openMenu)} onClick={setOpenMenu}>
      <Stick />
      <Stick />
      <Stick />
    </Wrapper>
  );
};

export default Hamburger;

export const Wrapper = styled(motion.button)`
  min-width: 76px;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  position: relative;
  padding: 16px;
  align-self: center;
`;

export const Stick = styled.div`
  width: 100%;
  height: 2px;
  background-color: var(--mainColor);
`;
