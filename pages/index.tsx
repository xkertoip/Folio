import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import React from 'react';
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
import Slider, {
  Slide,
  ItemContent,
  ImageContainer,
  Description,
} from '../components/Slider';
import { Introduce, Section, TitleContainer } from '../components/Containers';
import Footer from '../components/Footer';
import { request } from '../lib/datocms';
import { useQuerySubscription } from 'react-datocms';
import { Project } from '../lib/types';
import Link from 'next/link';
const backgroundImage = require('/images/home_background.jpg');
const downloadImage = require('/images/download.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Home: NextPage = ({ subscription }: any) => {
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
    <Layout title={title} description={subtitle}>
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
        <Slider>
          {allProjects?.map((project: Project) => (
            <Slide key={project.title}>
              <Link href={project.slug}>
                <ItemContent>
                  <ImageContainer>
                    <Image
                      src={backgroundImage}
                      alt="project preview"
                      objectFit="cover"
                      layout="fill"
                    />
                  </ImageContainer>
                  <Description>
                    <h4>{project.title}</h4>
                    <Line />
                    <h3> {project.technology}</h3>
                    <Line />
                    <p>
                      {project.introduction?.length > 10 &&
                        project.introduction.slice(0, 45) + '...'}
                    </p>
                  </Description>
                </ItemContent>
              </Link>
            </Slide>
          ))}
        </Slider>
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
    </Layout>
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
        title
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
