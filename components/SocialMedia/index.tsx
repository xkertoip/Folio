import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
const facebook = require('/images/facebook.svg');
const linkedIn = require('/images/linkedin.svg');
const github = require('/images/github.svg');
const flagPl = require('/images/poland.svg');
const flagUK = require('/images/uk.svg');
const light = require('/images/light.svg');
const dark = require('/images/dark.svg');

const item = {
  hidden: { opacity: 0, translateY: '100%' },
  show: { opacity: 1, translateY: 0 },
};

export default function SocialMedia() {
  const router = useRouter();
  const currentPath = useRouter().asPath;
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Link href="https://www.linkedin.com/in/piotr-szczypka/" target="_blank">
        <ImageContainer variants={item}>
          <Image
            src={linkedIn}
            alt="linkedIn"
            layout="fill"
            objectFit="contain"
          />
        </ImageContainer>
      </Link>
      <Link href="https://www.github.com/xkertoip" target="_blank">
        <ImageContainer variants={item}>
          <Image src={github} alt="github" layout="fill" objectFit="contain" />
        </ImageContainer>
      </Link>
      <Link href="https://www.facebook.com/piotrek.szczypka/" target="_blank">
        <ImageContainer variants={item}>
          <Image
            src={facebook}
            alt="facebook"
            layout="fill"
            objectFit="contain"
          />
        </ImageContainer>
      </Link>
      <Link href={currentPath} locale={router.locale === 'en' ? 'pl' : 'en'}>
        <ImageContainer variants={item}>
          <Image
            src={router.locale === 'en' ? flagPl : flagUK}
            layout="fill"
            objectFit="contain"
            alt="Poland flag"
          />
        </ImageContainer>
      </Link>
      <ImageContainer
        variants={item}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Image
          src={theme === 'dark' ? light : dark}
          width={26}
          height={26}
          alt="light"
        />
      </ImageContainer>{' '}
    </>
  );
}

const ImageContainer = styled(motion.a)`
  color: var(--main);
  height: 26px;
  width: 26px;
  text-align: right;
  overflow: hidden;
  position: relative;
  :hover {
    color: var(--specialColor);
  }
`;
