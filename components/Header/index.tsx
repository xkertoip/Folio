import styled from 'styled-components';
import Hamburger from './Hamburger';
import Content from './Content';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';

function Header() {
  return (
    <>
      <Hamburger />
      <Content />
    </>
  );
}

export default Header;

export const Wrapper = styled.header`
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  transition: 0.3s;
  z-index: 100;
  padding: 1rem;
`;

export const Brand = styled.div`
  z-index: 100;
  padding: 0 1rem;
  width: 150px;
  position: relative;
`;
