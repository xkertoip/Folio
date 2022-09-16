import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import CircleButton from '../components/CircleButton';
import Perspective from '../components/Perspective';
import Title from '../components/AnimatedSection/Title';
import { useTranslation } from 'next-i18next';
import DownloadButton from '../components/DownloadButton';
import mailImage from '/images/mail.svg';
import { Container, Section, TitleContainer } from '../components/Containers';
import Footer from '../components/Footer';
import { request } from '../lib/datocms';
import { useQuerySubscription } from 'react-datocms';
import NewSlider from '../components/Slider/newSlider';
import DefaultLayout from '../components/Layout';
import { NextPageWithLayout } from './_app';
import ParallaxEffect from '../components/ParallaxEffect';
import { Project } from '../lib/types';
import dynamic from 'next/dynamic';
import { Indicator } from '../components/Headings';
import { useTheme } from 'next-themes';

const downloadImage = require('/images/download.svg');
const mainView1 = require('/images/mainView1.jpeg');
const mainView2 = require('/images/mainView2.jpg');
const mainView3 = require('/images/mainView4.jpg');
const logoLight = require('/images/logoPS_light.svg');
const logoDark = require('/images/logoPS_dark.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const PerspectiveWithoutSSR = dynamic(
  () => import('../components/Perspective'),
  {
    ssr: false,
  }
);

const Home: NextPageWithLayout = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);
  const { t } = useTranslation('common');
  const parallaxArray = ['JavaScript', 'React', 'Next', 'Gatsby', 'Wordpress'];
  const { theme } = useTheme();
  return (
    <>
      <Section>
        <MainViewContainer as={Container}>
          <div>
            <Indicator>N&#176;1 Hello</Indicator>
          </div>
          <div>
            <ImageWrapper>
              <Image src={mainView3} alt={'logo'} />
            </ImageWrapper>
          </div>
          <div>
            <ImageWrapper>
              <Image src={mainView1} alt={'logo'} />
            </ImageWrapper>
            <ImageWrapper>
              <Image
                src={theme === 'dark' ? logoLight : logoDark}
                alt={'logo'}
              />
            </ImageWrapper>
          </div>
        </MainViewContainer>
      </Section>
      <Section>
        <SecondViewContainer as={Container}>
          <div>
            <Indicator>N&#176;2 About</Indicator>
            <h2>Positive Guy</h2>{' '}
          </div>
          <div>
            <p>{t(`introduce`)}</p>
            <p>{t(`cvText`)}</p>

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
          <div>
            <ImageWrapper>
              <Image src={mainView2} alt={'logo'} />
            </ImageWrapper>
          </div>
        </SecondViewContainer>
      </Section>
      <Section>
        <ThirdView as={Container}>
          <div>
            <Indicator>N&#176;3 Work</Indicator>
            <h2>Some Work</h2>
          </div>
          <ProjectWrapper>
            {allProjects.map((projects: Project) => (
              <ProjectContainer key={projects.id}>
                <ProjectImageWrapper>
                  <Image
                    alt="project"
                    src={projects.image.responsiveImage.src}
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="top center"
                    width={400}
                    height={280}
                  />
                </ProjectImageWrapper>
                <h3>{projects.title}</h3>
                <Indicator>{projects.adds}</Indicator>
              </ProjectContainer>
            ))}
          </ProjectWrapper>
        </ThirdView>
      </Section>
      <Section>
        <Container>
          <h2>Skills</h2>
        </Container>
        <Line />
        <ParallaxEffect array={parallaxArray} />
        <Line />
        <ParallaxEffect array={parallaxArray} reverse={true} />
        <Line />
      </Section>
      {/*      <ParallaxImage image={backgroundImage} />*/}
      {/*      <PerspectiveWithoutSSR>
        <TitleContainer>
          <Title title="/CREATIVE DEVELOPER/" />
        </TitleContainer>
      </PerspectiveWithoutSSR>*/}

      {/*  <section>
        <Container>
          <InfoContainer>
            <p>{t(`introduce`)}</p>
            <Line />
            <p>{t(`cvText`)}</p>
          </InfoContainer>
          <DownloadButton text={t(`download`)}>
            <Image
              src={downloadImage}
              alt="download"
              layout="responsive"
              objectFit="cover"
              objectPosition="top center"
            />
          </DownloadButton>
        </Container>
      </section>*/}
      {/*      <Section>
        <Line />
        <ParallaxEffect array={parallaxArray} />
        <Line />
        <ParallaxEffect array={parallaxArray} reverse={true} />
        <Line />
      </Section>*/}
      {/*     <section>
        <Slider array={allProjects} />
      </section>*/}
      {/*<section>
        <Container>
          <h4
            style={{
              textAlign: 'right',
              color: 'var(--main)',
            }}
          >
            Work
          </h4>
          <h2>
            Selected <br /> Work
          </h2>
        </Container>
        <Container>
          {allProjects.map((projects: Project) => (
            <ProjectContainer key={projects.id}>
              <ImageWrapper>
                <Image
                  alt="project"
                  src={projects.image.responsiveImage.src}
                  layout="responsive"
                  objectFit="contain"
                  objectPosition="top center"
                  width={400}
                  height={280}
                />
              </ImageWrapper>
              <h4>{projects.title}</h4>
              <span>{projects.adds}</span>
            </ProjectContainer>
          ))}
        </Container>
      </section>
      <Section>
        <CircleButton link="/contact" image={mailImage}>
          <h4>{t(`mailWelcome`)}</h4>
          <p>
            {t(`mailTitle`)} <br /> {t(`mailSubtitle`)}
          </p>
        </CircleButton>
      </Section>*/}
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

const MainViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  min-height: calc(100vh - 2rem);
  div:first-child {
    grid-area: 1/1/2/2;
  }
  div:nth-child(2) {
    grid-area: 1/2/3/4;
  }
  div:last-child {
    grid-area: 2/1/4/3;
  }
`;

const SecondViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  div:first-child {
    grid-area: 1 / 1 / 3 / 4;
    position: relative;
    z-index: 2;
  }
  div:nth-child(2) {
    grid-area: 3 / 1 / 6 / 3;
    z-index: 1;
  }
  div:last-child {
    grid-area: 2 / 2 / 5 / 4;
    z-index: 0;
  }
`;

const ThirdView = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 2;
`;
const ProjectWrapper = styled.div``;

const ProjectContainer = styled.div`
  margin-bottom: 2rem;
  span {
    color: var(--main);
  }
`;
const InfoContainer = styled.div`
  padding-top: 5rem;
`;
const Line = styled.div`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--main);
  position: relative;
  z-index: 2;
`;
const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  opacity: 0.9;
`;
const ProjectImageWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
`;
export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const formattedLocale = locale?.split('-')[0];
  const graphqlRequest = {
    query: `
    {
        allProjects(first: "3", orderBy: order_ASC) {
        introduction(locale: ${formattedLocale})
        slug
        id
        title
        adds
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
