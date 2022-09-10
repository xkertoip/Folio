import styled from 'styled-components';

import React from 'react';

export default function Footer() {
  return (
    <Wrapper>
      <Info>
        <span>Piotr Szczypka@2022</span>
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  padding: 0 1rem;
`;
const Info = styled.div`
  display: flex;
  padding: 1rem 0;
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
  }
`;

const Line = styled.div`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mainColor);
  position: relative;
  z-index: 2;
`;
