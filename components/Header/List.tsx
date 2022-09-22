import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { MenuContext } from './MenuManager';
import { useTranslation } from 'next-i18next';

const menu = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Projects', path: '/projects' },
  { title: 'Contact', path: '/contact' },
];
type Props = {
  variants: {};
};

function List({ variants }: Props) {
  const { handleOpen } = useContext(MenuContext);
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <menu className={'overflow-hidden'}>
      {menu.map(({ path, title }, index) => (
        <li
          key={index}
          onClick={handleOpen}
          className={'overflow-hidden py-2 flex'}
        >
          <Link href={path}>
            <a>
              <motion.h1
                className={`text-3xl md:text-6xl font-RedHatText hover:text-active hover:dark:text-active ease-in-out duration-300 ${
                  router.asPath === path
                    ? 'text-secondary dark:text-primary'
                    : 'text-neutral dark:text-neutral'
                } `}
                variants={variants}
              >
                {t(`${title}`)}
              </motion.h1>
            </a>
          </Link>
        </li>
      ))}
    </menu>
  );
}

export default List;
