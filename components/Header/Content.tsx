import styled from 'styled-components';
import { motion } from 'framer-motion';
import { device } from '../../styles/mediaQuery';
import List from './List';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';
import useWindowDimensions from '../../utils/useWindowDimensions';
import SocialMedia from '../SocialMedia';

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
const firstItem = {
  hidden: { opacity: 0, translateX: '100%' },
  show: { opacity: 1, translateX: 0 },
};

function Content() {
  const { openMenu } = useContext(MenuContext);

  const windowSize = useWindowDimensions();
  return (
    <>
      <InnerBackground
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
          <motion.h5 variants={firstItem}>N&#176; Menu</motion.h5>
          <Navigation>
            <List />
          </Navigation>
          <SocialWrapper>
            <SocialMedia />
          </SocialWrapper>

          <Info>
            <motion.span variants={item}>Kasinka Mała, 648</motion.span>
            <motion.a variants={item} href="tel:+48 536 777 364">
              {' '}
              +48 536 777 364
            </motion.a>
            <motion.span variants={item}>Poland</motion.span>
          </Info>
        </Container>
      </InnerBackground>
    </>
  );
}

export default Content;

const Container = styled(motion.nav)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 4rem);
  transform-origin: bottom center;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 3rem;
  h5 {
    color: var(--main);
    text-align: right;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: normal;
  }

  @media only screen and ${device.tablet} {
    flex-direction: row;
    padding: 0 10%;
    justify-content: space-around;
  }
`;

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  gap: 1rem;
  align-items: end;
  text-align: right;
`;

const InnerBackground = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transform-origin: bottom center;
  background-color: var(--secondaryColor);
  z-index: 299;
`;

const Navigation = styled.ul`
  padding: 2rem 2rem 0;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  a {
    padding: 0;
  }
  * {
    overflow: hidden;
    color: var(--main);
  }
`;
