import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { MenuContext } from './HeaderManager';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
      {menu.map((item, index) => (
        <ListItem
          key={index}
          variants={variants}
          onClick={setOpenMenu}
          active={router.pathname === item.path ? 'active' : 'disable'}
        >
          <Link href={item.path}>{t(`${item.title}`)}</Link>
        </ListItem>
      ))}
    </>
  );
}

export default List;

const ListItem = styled(motion.li)<{ active: string }>`
  a {
    color: var(
      ${({ active }) => (active === 'active' ? '--main' : '--mainColor')}
    );
    width: 100%;
    font-size: 2.5rem;
    overflow: hidden;
    position: relative;
    font-family: BodoniModa, serif;
    transition: all 0.5s;
    :before {
      content: '';
      min-width: 100%;
      height: 8px;
      position: absolute;
      margin: auto;
      background-color: var(--background);
      top: 50%;
      transform: translateX(
        ${({ active }) => (active === 'active' ? 0 : -100)}%
      );
      transition: transform 1s;
    }
    :hover {
      color: var(--secondaryColor);
      :before {
        transform: translateX(0);
      }
    }
    @media only screen and ${device.tablet} {
      font-size: 4rem;
    }
  }
`;
