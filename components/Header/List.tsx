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
  hidden: { opacity: 0, translateY: '100%' },
  show: { opacity: 1, translateY: 0 },
};

function List() {
  const { setOpenMenu } = useContext(MenuContext);
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <>
      {menu.map(({ path, title }, index) => (
        <Wrapper key={index} onClick={setOpenMenu}>
          <Link href={path}>
            <Container
              variants={variants}
              style={{
                color: `var(${
                  router.pathname === path ? '--main' : '--mainColor'
                })`,
              }}
            >
              {t(`${title}`)}
            </Container>
          </Link>
        </Wrapper>
      ))}
    </>
  );
}

export default List;

const Wrapper = styled.li`
  overflow: hidden;
`;
const Container = styled(motion.a)`
  font-size: 2rem;
  padding: 0;
  display: block;
  position: relative;
  font-family: BodoniModa, serif;
  :hover {
    color: var(--secondary);
  }
  @media only screen and ${device.tablet} {
    font-size: 4rem;
  }
`;
