import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import SocialMedia from '../components/SocialMedia';
import CircleButton from '../components/CircleButton';
import Perspective from '../components/Perspective';
import Title from '../components/AnimatedSection/Title';
import { useTranslation } from 'next-i18next';
import DownloadButton from '../components/DownloadButton';
import mailImage from '/images/mail.svg';
import { Introduce, Section, TitleContainer } from '../components/Containers';
import Footer from '../components/Footer';
import { request } from '../lib/datocms';
import { useQuerySubscription } from 'react-datocms';
import NewSlider from '../components/Slider/newSlider';
import DefaultLayout from '../components/Layout';
import { NextPageWithLayout } from './_app';
import ParallaxEffect from '../components/ParallaxEffect';
import ParallaxImage from '../components/ParallaxImage';
const backgroundImage = require('/images/home_background.jpg');
const downloadImage = require('/images/download.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Home: NextPageWithLayout = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);
  const { t } = useTranslation('common');
  const parallaxArray = ['JavaScript', 'React', 'Next', 'Gatsby', 'Wordpress'];

  return (
    <>
      {/*      <ParallaxImage image={backgroundImage} />*/}
      <Perspective>
        <TitleContainer>
          <Title title="/CREATIVE DEVELOPER/" />
        </TitleContainer>
      </Perspective>
      <Section>
        <Introduce>
          <div>
            <p>{t(`introduce`)}</p>
            <Line />
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
          </div>
        </Introduce>
      </Section>
      <Section>
        <Line />
        <ParallaxEffect array={parallaxArray} />
        <Line />
        <ParallaxEffect array={parallaxArray} reverse={true} />
        <Line />
      </Section>

      {/*     <section>
        <Slider array={allProjects} />
      </section>*/}

      <Section>
        <NewSlider array={allProjects} />
      </Section>
      <Section>
        <CircleButton link="/contact" image={mailImage}>
          <h3>{t(`mailWelcome`)}</h3>
          <p>{t(`mailTitle`)}</p>
          <p>{t(`mailSubtitle`)}</p>
        </CircleButton>
      </Section>

      <Footer />
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
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mainColor);
  position: relative;
  z-index: 2;
`;

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const formattedLocale = locale?.split('-')[0];
  const graphqlRequest = {
    query: `
    {
        allProjects(orderBy: order_ASC) {
        introduction(locale: ${formattedLocale})
        slug
        id
        title
        order
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
