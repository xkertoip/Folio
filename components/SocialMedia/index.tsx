import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../Menu/MenuManager';
const facebook = require('/images/fb.svg');
const insta = require('/images/insta.svg');
const linkedIn = require('/images/linkedIn.svg');
const github = require('/images/github.svg');
type Props = {
  variants?: {};
};

export default function SocialMedia({ variants }: Props) {
  return (
    <>
      <Link href="https://www.linkedin.com/in/piotr-szczypka/" target="_blank">
        <a>
          <motion.div
            className={'text-primary h-8 w-8  overflow-hidden relative h'}
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
            className={'text-primary h-8 w-8  overflow-hidden relative '}
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
            className={'text-primary h-8 w-8  overflow-hidden relative '}
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
            className={'text-primary h-8 w-8  overflow-hidden relative '}
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
    </>
  );
}
