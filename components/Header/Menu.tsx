import styled from 'styled-components';
import { motion } from 'framer-motion';
import { device } from '../../styles/mediaQuery';
import List from './List';
import React, { useContext } from 'react';
import { MenuContext } from './HeaderManager';
import useWindowDimensions from '../../utils/useWindowDimensions';
import SocialMedia from '../SocialMedia';
import { Indicator } from '../Headings';

const variantsContainer = {
  hidden: {
    scaleY: 0,
    transition: {
      duration: 0.6,
      staggerDirection: -1,
      staggerChildren: 0.1,
      when: 'afterChildren',
    },
  },
  show: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const variantsBackground = {
  hidden: {
    scaleY: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
  show: {
    scaleY: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const item = {
  hidden: { opacity: 0, translateY: '100%' },
  show: { opacity: 1, translateY: 0 },
};

function Menu() {
  const { openMenu } = useContext(MenuContext);

  const windowSize = useWindowDimensions();
  return (
    <>
      <Wrapper
        initial="hidden"
        animate={openMenu ? 'show' : 'hidden'}
        variants={variantsBackground}
      >
        <Container
          variants={variantsContainer}
          style={{
            height: windowSize?.windowHeight,
          }}
        >
          <Header>N&#176;0 Menu</Header>
          <Content>
            <nav>
              <List />
            </nav>
            <Info>
              <motion.p variants={item}>Kasinka Mała, 648</motion.p>
              <motion.a variants={item} href="tel:+48 536 777 364">
                +48 536 777 364
              </motion.a>
              <motion.p variants={item}>Poland</motion.p>
            </Info>
          </Content>

          <SocialWrapper>
            <SocialMedia />
          </SocialWrapper>
        </Container>
      </Wrapper>
    </>
  );
}

export default Menu;

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 4rem);
  transform-origin: bottom center;
  background-color: var(--background);
  padding: 1rem 1rem 3rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(2, 1fr);

  h4 {
    color: var(--main);
    text-align: right;
    font-weight: normal;
  }

  @media only screen and ${device.tablet} {
    flex-direction: row;
    padding: 0 10%;
    justify-content: space-around;
  }
`;
const Content = styled.div`
  grid-area: 1 / 1 / 3 / 2;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-bottom: 1px solid var(--main);
`;
const Header = styled.header`
  font-family: CaudexItalic, sans-serif;
  color: var(--secondary);
  font-size: 1.5rem;
`;
const SocialWrapper = styled.aside`
  grid-area: 1 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  gap: 1rem;
  align-items: end;
  text-align: right;
`;

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transform-origin: bottom center;
  background-color: var(--secondaryColor);
  z-index: 299;
`;

const Info = styled.div`
  overflow: hidden;
  padding-bottom: 1rem;
  * {
    margin: 0;
    overflow: hidden;
    color: var(--main);
  }
`;
