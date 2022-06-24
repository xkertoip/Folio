import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import Content from './Content';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';

function Header() {
  const { openMenu } = useContext(MenuContext);
  return (
    <>
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
    </>
  );
}

export default Header;

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  transition: 0.3s;
  z-index: 100;
`;

export const Brand = styled.div`
  z-index: 100;
  a {
    font-size: 2.5rem;
    font-family: BodoniModa, serif;
    padding: 0 16px;
    align-self: center;
  }
`;
