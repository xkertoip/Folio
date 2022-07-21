import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { device } from '../../styles/mediaQuery';
import List from './List';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';
import Image from 'next/image';
import flagPL from '/images/poland.svg';
import flagUK from '/images/uk.svg';
import light from '/images/light.svg';
import dark from '/images/dark.svg';

const variants = {
  hidden: {
    scaleY: 0,
    transition: {
      delayChildren: -1,
      staggerChildren: 0.5,
      when: 'afterChildren',
    },
  },
  show: {
    scaleY: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const background = {
  hidden: {
    scaleY: 0,
    transition: {
      delay: 0.7,
    },
  },
  show: {
    scaleY: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const container = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, translateY: -15 },
  show: { opacity: 1, translateY: 0 },
};

function Content() {
  const { openMenu } = useContext(MenuContext);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const currentPath = useRouter().asPath;
  return (
    <>
      <InnerBackground
        variants={background}
        initial="hidden"
        animate={openMenu ? 'show' : 'hidden'}
      />

      <Wrapper
        variants={variants}
        initial="hidden"
        animate={openMenu ? 'show' : 'hidden'}
      >
        <Navigation variants={container}>
          <List />
        </Navigation>
        <Info variants={container}>
          <motion.p variants={item}>
            <strong>Contact Info</strong>
          </motion.p>
          <motion.p variants={item}>Kraków</motion.p>
          <motion.a variants={item} href="tel:+48 536 777 364">
            {' '}
            +48 536 777 364
          </motion.a>
        </Info>
        <Options variants={container}>
          <Link
            href={currentPath}
            locale={router.locale === 'en' ? 'pl' : 'en'}
          >
            <motion.a variants={item}>
              <Image
                src={router.locale === 'en' ? flagPL : flagUK}
                height={40}
                width={40}
                alt="Poland flag"
              />
            </motion.a>
          </Link>
          <motion.button
            variants={item}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Image
              src={theme === 'dark' ? light : dark}
              width={40}
              height={30}
              alt="light"
            />
          </motion.button>{' '}
        </Options>
      </Wrapper>
    </>
  );
}

export default Content;

const Wrapper = styled(motion.nav)`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  min-height: calc(100vh - 8rem);
  transform-origin: top center;
  background-color: var(--background);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;
  @media only screen and ${device.tablet} {
    flex-direction: row;
    padding: 0 10%;
    justify-content: space-around;
  }
`;

const InnerBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  z-index: -1;
  transform-origin: top center;
  background-color: var(--secondaryColor);
`;

const Navigation = styled(motion.ul)`
  @media only screen and ${device.tablet} {
    align-self: center;
  }
`;
const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: end;
  p,
  a {
    font-size: 1.3rem;
  }
  a {
    padding: 0;
  }
  @media only screen and ${device.tablet} {
    align-self: center;
    p,
    a {
      font-size: 2rem;
    }
  }
`;
const Options = styled(motion.div)`
  display: flex;
  gap: 16px;
  justify-content: flex-end;

  @media only screen and ${device.tablet} {
    position: absolute;
    bottom: 0;
    right: 16px;
  }
`;
