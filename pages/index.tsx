import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OnView from '../components/OnView';
import { device } from '../styles/mediaQuery';
import SocialMedia from '../components/SocialMedia';
import CircleButton from '../components/CircleButton';
import Perspective from '../components/Perspective';
import Title from '../components/AnimatedSection/Title';
import { useTranslation } from 'next-i18next';
import ParallaxEffect from '../components/ParallaaxEffext';
import DownloadButton from '../components/DownloadButton';
import mailImage from '/images/mail.svg';
import ImageSection from '../components/ParallaxImage';
import SpecialSection from '../components/ParallaxImage/specialSection';
import ParallaxImage from '../components/ParallaxImage';
const backgroundImage = require('/images/home_background.jpg');
const downloadImage = require('/images/download.svg');
const prev = require('/images/prev.svg');
const next = require('/images/next.svg');
const aboutBackground = require('/images/pesrpsective.jpeg');
const projectsBackground = require('/images/code.jpg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";
const array = [backgroundImage];

const Home: NextPage = () => {
  const { t } = useTranslation('common');
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

  return (
    <Layout title={title} description={subtitle}>
      <section>
        <Perspective>
          <OnView>
            <Title title="Piotr Szczypka," />
            {subtitle ? (
              <Title title="Frontend developer" content="Web Developer" />
            ) : null}
            <SocialMedia />
          </OnView>
        </Perspective>
        <ParallaxImage image={backgroundImage}>
          <OnView>
            <h2>Cześć, tu Piotrek!</h2>
            <p>
              Jestem frontend developerem, obecnie koduję w React, z
              wykorzystaniem frameworka Next.js, do budowania stron
              wykorzystujących SSR w celu podniesienia rezultatów wyszukiwania
              przez roboty.
            </p>
          </OnView>
          <div>
            <OnView>
              <h3>{t(`cvText`)}</h3>
            </OnView>
            <OnView>
              <DownloadButton text={t(`download`)}>
                <Image
                  src={downloadImage}
                  alt="download"
                  objectFit="contain"
                  layout="responsive"
                />
              </DownloadButton>
            </OnView>
          </div>
          {/*  <Slider array={projectsData} />*/}
        </ParallaxImage>
      </section>
      <Line />
      <ParallaxEffect array={parallaxArray} />
      <Line />
      <ParallaxEffect array={parallaxArray} reverse={true} />
      <Line />
      <section>
        <OnView>
          <CircleButton link="/contact" image={mailImage}>
            <h3>{t(`mailWelcome`)}</h3>
            <p>{t(`mailTitle`)}</p>
            <p>{t(`mailSubtitle`)}</p>
          </CircleButton>
        </OnView>
      </section>
      <section
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Choice>
          <Link href="/about">
            <a>
              <BackgroundChoiceText>
                <p>{t(`projects`)}</p> <Image src={prev} alt="prev" />
              </BackgroundChoiceText>
              <BackgroundChoice>
                <Image
                  src={projectsBackground}
                  layout="fill"
                  objectFit="cover"
                  alt="about"
                />
              </BackgroundChoice>
            </a>
          </Link>
          <Link href="/contact">
            <a>
              <BackgroundChoiceText>
                <p>{t(`about`)}</p> <Image src={next} alt="next" />
              </BackgroundChoiceText>

              <BackgroundChoice>
                <Image
                  src={aboutBackground}
                  layout="fill"
                  objectFit="cover"
                  alt="about"
                />
              </BackgroundChoice>
            </a>
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
  gap: 2rem;
  flex-direction: column;
  z-index: 2;
  padding: 4rem 1rem;
  @media only screen and ${device.tablet} {
    padding: 4rem 10%;
    justify-content: center;
  }
`;
const BackgroundChoice = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.2;
  transition-duration: 0.8s;
  :hover {
    opacity: 0.6;
  }
`;
const BackgroundChoiceText = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;
const Choice = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  a {
    width: 100%;
    height: 50vh;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;
    font-size: 2rem;
    background-color: var(--background);
  }
  @media only screen and ${device.tablet} {
    flex-direction: row;
    a {
      height: unset;
    }
  }
`;

const Line = styled.div`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mainColor);
  position: relative;
`;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
});
