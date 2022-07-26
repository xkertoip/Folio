import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import SocialMedia from '../components/SocialMedia';
import CircleButton from '../components/CircleButton';
import Perspective from '../components/Perspective';
import Title from '../components/AnimatedSection/Title';
import { useTranslation } from 'next-i18next';
import ParallaxEffect from '../components/ParallaaxEffext';
import DownloadButton from '../components/DownloadButton';
import mailImage from '/images/mail.svg';
import ParallaxImage from '../components/ParallaxImage';
import { Introduce, Section, TitleContainer } from '../components/Containers';
import Footer from '../components/Footer';
import { request } from '../lib/datocms';
import { useQuerySubscription } from 'react-datocms';
import Slider from '../components/Slider';
import { AppLayoutProps } from 'next/app';
import DefaultLayout from '../components/Layout';
import { NextPageWithLayout } from './_app';
const backgroundImage = require('/images/home_background.jpg');
const downloadImage = require('/images/download.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Home: NextPageWithLayout = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);

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
    <>
      <ParallaxImage image={backgroundImage}>
        <Perspective>
          <TitleContainer>
            <Title title="Piotr Szczypka," />
            {subtitle ? (
              <Title title="Frontend developer" content="Web Developer" />
            ) : null}
            <SocialMedia />
          </TitleContainer>
        </Perspective>
        <Introduce>
          <h2>Cześć, tu Piotrek!</h2>
          <p>
            Jestem frontend developerem, obecnie koduję w React, z
            wykorzystaniem frameworka Next.js, do budowania stron
            wykorzystujących SSR w celu podniesienia rezultatów wyszukiwania
            przez roboty.
          </p>
          <div>
            <h4>{t(`cvText`)}</h4>

            <DownloadButton text={t(`download`)}>
              <Image
                src={downloadImage}
                alt="download"
                layout="responsive"
                objectFit="cover"
                objectPosition="top center"
              />
            </DownloadButton>
          </div>
        </Introduce>
      </ParallaxImage>
      <Section>
        <Line />
        <ParallaxEffect array={parallaxArray} />
        <Line />
        <ParallaxEffect array={parallaxArray} reverse={true} />
        <Line />
      </Section>

      <section>
        <Slider array={allProjects} />
      </section>
      <section>
        <CircleButton link="/contact" image={mailImage}>
          <h3>{t(`mailWelcome`)}</h3>
          <p>{t(`mailTitle`)}</p>
          <p>{t(`mailSubtitle`)}</p>
        </CircleButton>
      </section>
      <section
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Footer link="about" />
      </section>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout title={title} description={subtitle}>
      {page}
    </DefaultLayout>
  );
};
export default Home;

const Line = styled.div`
  border-width: 2px 0 0;
  border-style: solid;
  border-color: var(--main);
  position: relative;
`;

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const formattedLocale = locale?.split('-')[0];
  const graphqlRequest = {
    query: `
    {
        allProjects {
        introduction(locale: ${formattedLocale})
        slug
        id
        image {
      responsiveImage {
        src
      }
    }
    }
    }
   `,
    preview,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'home'])),
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
};
