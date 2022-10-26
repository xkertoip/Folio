import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from './MenuManager';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Image from 'next/image';
const flagPl = require('/images/poland.svg');
const flagUK = require('/images/uk.svg');
const light = require('/images/light.svg');
const dark = require('/images/dark.svg');

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
  const currentPath = useRouter().asPath;
  const { theme, setTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (currentTheme === 'dark') {
      return (
        <Image
          src={dark}
          objectFit={'cover'}
          layout={'responsive'}
          alt="light"
        />
      );
    } else {
      return (
        <Image
          src={light}
          objectFit={'cover'}
          layout={'responsive'}
          alt="light"
        />
      );
    }
  };
  return (
    <menu className={'overflow-hidden pr-8'}>
      {menu.map(({ path, title }, index) => (
        <li
          key={index}
          onClick={handleOpen}
          className={'overflow-hidden py-2 flex justify-end'}
        >
          <Link href={path}>
            <a>
              <motion.h1
                id={path}
                className={`text-4xl md:text-6xl font-CaudexItalic hover:text-secondary hover:dark:text-secondary ease-in-out duration-300 ${
                  router.asPath === path
                    ? 'text-primaryLight dark:text-active'
                    : 'text-primaryDark dark:text-primaryLight'
                } `}
                variants={variants}
              >
                {t(`${title}`)}
              </motion.h1>
            </a>
          </Link>
        </li>
      ))}
      <li className={'overflow-hidden flex justify-end py-2 '}>
        <a>
          <motion.div
            className={'text-primary h-8 w-8 overflow-hidden relative '}
            variants={variants}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {renderThemeChanger()}
          </motion.div>
        </a>
      </li>
      <li className={'overflow-hidden flex justify-end py-2 '}>
        <Link href={currentPath} locale={router.locale === 'en' ? 'pl' : 'en'}>
          <a onClick={handleOpen}>
            <motion.div
              className={'text-primary h-8 w-8  overflow-hidden relative '}
              variants={variants}
            >
              <Image
                src={router.locale === 'en' ? flagPl : flagUK}
                objectFit={'cover'}
                layout={'responsive'}
                alt="Poland flag"
              />
            </motion.div>
          </a>
        </Link>
      </li>
    </menu>
  );
}

export default List;
