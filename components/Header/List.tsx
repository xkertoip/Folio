import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';
import { useTranslation } from 'next-i18next';
import { device } from '../../styles/mediaQuery';

const menu = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Projects', path: '/projects' },
  { title: 'Contact', path: '/contact' },
];

const variants = {
  hidden: { opacity: 0, translateY: -15 },
  show: { opacity: 1, translateY: 0 },
};

function List() {
  const { setOpenMenu } = useContext(MenuContext);
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      {menu.map(({ path, title }, index) => (
        <ListItem key={index} variants={variants} onClick={setOpenMenu}>
          <Link href={path}>
            <a
              style={{
                color: `var(${
                  router.pathname === path ? '--main' : '--mainColor'
                })`,
              }}
            >
              {t(`${title}`)}
            </a>
          </Link>
        </ListItem>
      ))}
    </>
  );
}

export default List;

const ListItem = styled(motion.li)`
  a {
    width: 100%;
    font-size: 2.5rem;
    padding: 0;
    overflow: hidden;
    position: relative;
    font-family: BodoniModa, serif;
    transition: all 0.5s;
    :before {
      content: '';
      min-width: 100%;
      height: 5%;
      position: absolute;
      margin: auto;
      background-color: var(--background);
      top: 50%;
      transform: translateX(-100%);
      transition-duration: 0.5s;
    }
    :hover {
      color: var(--secondary);
      :before {
        transform: translateX(0);
      }
    }

    @media only screen and ${device.tablet} {
      font-size: 4rem;
    }
  }
`;
