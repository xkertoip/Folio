import styled from 'styled-components';

import React from 'react';
import SocialMedia from '../SocialMedia';

export default function Footer() {
  return (
    <Wrapper>
      <Line />
      <div>
        <SocialMedia />
      </div>

      <Info>
        <span>© 2022 - All rights reserved </span>
        <br />
        <span>Made by Piotr Szczypka</span>
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  padding: 0 1rem 3rem;
`;
const Info = styled.div`
  padding: 1rem 0;
  text-align: right;
  color: var(--main);
`;
const Content = styled.div`
  position: relative;
  min-height: 50vh;
  margin-bottom: 1rem;
`;
const ContentLink = styled.a`
  text-transform: uppercase;
  text-align: center;
  margin: auto;
  display: block;
  font-size: 2rem;
  font-weight: bold;
  span {
    margin-right: 2rem;
    text-align: right;
  }
`;

const Line = styled.div`
  border-width: 1px 0 0;
  width: 100%;
  border-style: solid;
  border-color: var(--main);
  position: relative;
  z-index: 2;
`;
