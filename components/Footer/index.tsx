import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';
import SocialMedia from '../SocialMedia';

export default function Footer() {
  return (
    <Wrapper>
      <SocialWrapper initial={'show'}>
        <SocialMedia />
      </SocialWrapper>

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
const SocialWrapper = styled(motion.div)`
  border-top: 1px solid var(--main);
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`;
