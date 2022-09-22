import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../Header/MenuManager';
const facebook = require('/images/fb.svg');
const insta = require('/images/insta.svg');
const linkedIn = require('/images/linkedIn.svg');
const github = require('/images/github.svg');
const flagPl = require('/images/poland.svg');
const flagUK = require('/images/uk.svg');
const light = require('/images/light.svg');
const dark = require('/images/dark.svg');

type Props = {
  variants: {};
};

export default function SocialMedia({ variants }: Props) {
  const { handleOpen } = useContext(MenuContext);
  const router = useRouter();
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
    <>
      <Link href="https://www.linkedin.com/in/piotr-szczypka/" target="_blank">
        <a>
          <motion.div
            className={
              'text-primary h-8 w-8  overflow-hidden relative hover:bg-active hover:dark:bg-active ease-in-out duration-300 '
            }
            variants={variants}
          >
            <Image
              src={linkedIn}
              alt="linkedIn"
              objectFit={'cover'}
              layout={'responsive'}
            />
          </motion.div>
        </a>
      </Link>
      <Link href="https://www.github.com/xkertoip" target="_blank">
        <a>
          <motion.div
            className={
              'text-primary h-8 w-8  overflow-hidden relative hover:bg-active hover:dark:bg-active ease-in-out duration-300'
            }
            variants={variants}
          >
            <Image
              src={insta}
              alt="insta"
              objectFit={'cover'}
              layout={'responsive'}
            />
          </motion.div>
        </a>
      </Link>
      <Link href="https://www.facebook.com/piotrek.szczypka/" target="_blank">
        <a>
          <motion.div
            className={
              'text-primary h-8 w-8  overflow-hidden relative hover:bg-active hover:dark:bg-active ease-in-out duration-300'
            }
            variants={variants}
          >
            <Image
              src={facebook}
              alt="facebook"
              objectFit={'contain'}
              layout={'responsive'}
            />
          </motion.div>
        </a>
      </Link>
      <Link href="https://www.github.com/xkertoip" target="_blank">
        <a>
          <motion.div
            className={
              'text-primary h-8 w-8  overflow-hidden relative hover:bg-active hover:dark:bg-active ease-in-out duration-300'
            }
            variants={variants}
          >
            <Image
              src={github}
              alt="github"
              objectFit={'cover'}
              layout={'responsive'}
            />
          </motion.div>
        </a>
      </Link>
      <a>
        <motion.div
          className={
            'text-primary h-8 w-8 overflow-hidden relative hover:bg-active hover:dark:bg-active ease-in-out duration-300'
          }
          variants={variants}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {renderThemeChanger()}
        </motion.div>
      </a>
      <Link href={currentPath} locale={router.locale === 'en' ? 'pl' : 'en'}>
        <a onClick={handleOpen}>
          <motion.div
            className={
              'text-primary h-8 w-8  overflow-hidden relative hover:bg-active hover:dark:bg-active ease-in-out duration-300'
            }
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
    </>
  );
}
