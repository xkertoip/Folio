import styled from 'styled-components';
import SocialMedia from '../SocialMedia';
import Link from 'next/link';
const next = require('/images/next.svg');
import Image from 'next/image';
import React from 'react';

type Props = {
  link: string;
};
export default function Footer({ link }: Props) {
  return (
    <Wrapper>
      <Link href={`/${link}`}>
        <Content>
          <h2>Explore more</h2>

          <Image src={next} alt="next" />
        </Content>
      </Link>
      <SocialMedia />
      <Line />
      <span>Piotr Szczypka@2022</span>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  padding: 3rem 1rem 2rem;
`;
const Content = styled.a`
  text-transform: uppercase;
  text-align: center;
  margin: 5rem auto;
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
  margin: 2rem 0;
`;
