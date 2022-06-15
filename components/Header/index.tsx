import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import Content from './Content';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';

function Header() {
  const { openMenu } = useContext(MenuContext);
  return (
    <Wrapper
      style={{
        backgroundColor: openMenu ? 'var(--background)' : 'transparent',
      }}
    >
      <Brand>
        <Link href="/">Ps</Link>
      </Brand>

      <Hamburger />
      <Content />
    </Wrapper>
  );
}

export default Header;

export const Wrapper = styled.header`
  position: fixed;
  height: 64px;
  min-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: 0.3s;
  z-index: 100;
`;

export const Brand = styled.div`
  a {
    font-size: 2.5rem;
    font-family: BodoniModa, serif;
    padding: 0 16px;
    align-self: center;
  }
`;
