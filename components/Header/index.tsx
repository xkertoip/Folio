import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import Content from './Content';

function Header() {
  return (
    <Wrapper>
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
  z-index: 10;
`;

export const Brand = styled.div`
  a {
    font-size: 2.5rem;
    font-family: BodoniModa, serif;
    padding: 0 16px;
    align-self: center;
  }
`;
