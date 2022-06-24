import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OnView from '../components/OnView';
import { device } from '../styles/mediaQuery';
import SocialMedia from '../components/SocialMedia';
import FollowImage from '../components/FollowImage';
import CircleButton from '../components/CircleButton';
import Perspective from '../components/Perspective';
import Title from '../components/AnimatedSection/Title';
import { useTranslation } from 'next-i18next';
import ParallaxEffect from '../components/ParallaaxEffext';
import DownloadButton from '../components/DownloadButton';

const backgroundImage = require('/images/home_background.jpg');
const downloadImage = require('/images/download.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";
const array = [backgroundImage];

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const [index, setIndex] = useState(0);
  const parallaxArray = [
    'React',
    'Web Development',
    t(`application`),
    'Frontend',
    'Next',
    'Gsap',
    'Gatsby',
    'Worpress',
  ];
  const handleIndex = (i: number) => {
    setIndex(i);
  };

  return (
    <Layout title={title} description={subtitle}>
      <FollowImage index={index} array={array} />
      <Perspective>
        <OnView>
          <Title title="Piotr Szczypka," />
          {subtitle ? (
            <Title title="Frontend developer" content="Web Developer" />
          ) : null}
          <SocialMedia />
        </OnView>
      </Perspective>
      <section>
        <Description>
          <OnView>
            <h2>Cześć, tu Piotrek!</h2>
            <p>
              Jestem frontend developerem, obecnie koduję w React, z
              wykorzystaniem frameworka Next.js, do budowania stron
              wykorzystujących SSR w celu podniesienia rezultatów wyszukiwania
              przez roboty.
            </p>
          </OnView>
          <OnView>
            <h3>Zostawiam moje CV:</h3>
            <DownloadButton text={t(`download`)}>
              <Image
                src={downloadImage}
                alt="download"
                objectFit="contain"
                layout="responsive"
              />
            </DownloadButton>
          </OnView>

          {/*  <Slider array={projectsData} />*/}
        </Description>
      </section>
      <ParallaxEffect array={parallaxArray} />
      <section>
        <Wrapper>
          <OnView>
            <CircleButton href="/contact">
              <h4>{t(`mailWelcome`)}</h4>
              <p>{t(`mailTitle`)}</p>
              <p>{t(`mailSubtitle`)}</p>
            </CircleButton>
          </OnView>
        </Wrapper>
      </section>
      <Wrapper>
        <span> a tu bedzie horyzontalna magia</span>
      </Wrapper>
      <section>
        <Choice>
          <Link href="/about">
            <a>Poznaj mnie!</a>
          </Link>
          <Link href="/contact">
            <a>Napisz do mnie!</a>
          </Link>
        </Choice>
      </section>
    </Layout>
  );
};

export default Home;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 4rem 1rem;
  @media only screen and ${device.tablet} {
    padding: 4rem 10%;
    justify-content: center;
  }
`;
const Description = styled(Wrapper)`
  @media only screen and ${device.tablet} {
    width: 50%;
  }
`;

const Choice = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;

  a {
    width: 100%;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;
    font-size: 2rem;
    background-color: var(--background);
    :hover {
      background-color: transparent;
      color: var(--secondaryColor);
    }
  }
`;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
});
