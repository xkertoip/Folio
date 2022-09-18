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
import { Indicator, SectionTitle } from '../components/Headings';
import { useTheme } from 'next-themes';

const downloadImage = require('/images/download.svg');
const mainView1 = require('/images/mainView1.jpeg');
const mainView2 = require('/images/mainView2.jpg');
const mainView3 = require('/images/mainView4.jpg');
const logoLight = require('/images/logoPS_light.svg');
const logoDark = require('/images/logoPS_dark.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const variants = {
  hover: {
    scaleX: [1, 0.5, 1, 0.5, 1],
    scaleY: [1, 0.5, 0.5, 0.5, 1],
  },
  initial: {
    scaleX: 1,
    scaleY: 1,
  },
};

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
        <Grid as={Container}>
          <div>
            <SectionTitle
              whileHover={'hover'}
              initial={'initial'}
              variants={variants}
            >
              Hi!<Indicator>N&#176;1 Hello</Indicator>
            </SectionTitle>
          </div>

          <OpacityWrapper as={Shadow}>
            <Image src={mainView3} alt={'logo'} />
          </OpacityWrapper>
          <div>
            <OpacityWrapper as={Shadow}>
              <Image src={mainView1} alt={'logo'} />
            </OpacityWrapper>
            <Image src={theme === 'dark' ? logoLight : logoDark} alt={'logo'} />
          </div>
        </Grid>
      </Section>
      <Section>
        <Grid as={Container}>
          <div>
            <SectionTitle>
              <Indicator>N&#176;2 About</Indicator>
              Positive Guy
            </SectionTitle>
          </div>

          <OpacityWrapper as={Shadow}>
            <Image src={mainView2} alt={'logo'} />
          </OpacityWrapper>

          <div>
            <p>{t(`introduce`)}</p>
            <p>{t(`cvText`)}</p>

            <DownloadButton
              text={t(`download`)}
              download={'CV_Piotr_Szczypka.pdf'}
              target={'_blank'}
              href={'/CV21.pdf'}
            >
              <Image
                src={downloadImage}
                alt="download"
                layout="responsive"
                objectFit="cover"
                objectPosition="top center"
              />
            </DownloadButton>
          </div>
        </Grid>
      </Section>
      <Section>
        <ThirdView as={Container}>
          <SectionTitle>
            <Indicator>N&#176;3 Work</Indicator>
            Some Work
          </SectionTitle>
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
                <h4>{projects.adds}</h4>
              </ProjectContainer>
            ))}
          </ProjectWrapper>
        </ThirdView>
      </Section>
      <Section>
        <div style={{ transform: 'rotate(-5deg)' }}>
          <Container>
            <SectionTitle>
              Skills <Indicator>N&#176;4 Skills</Indicator>
            </SectionTitle>
          </Container>
          <ParallaxEffect array={parallaxArray} />
          <ParallaxEffect array={parallaxArray} reverse={true} />
        </div>
      </Section>
      <Section>
        <Container>
          <Perspective>
            <ContactWrapper>
              <h1>Have I intrested you ? </h1>
              <DownloadButton text={'Contact!'} href={'/contact'}>
                <Image
                  src={mailImage}
                  alt="download"
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="top center"
                />
              </DownloadButton>
            </ContactWrapper>
          </Perspective>
        </Container>
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  min-height: calc(100vh - 2rem);
  div:first-child {
    grid-area: 1/1/2/3;
    position: relative;
    z-index: 2;
  }
  div:nth-child(2) {
    grid-area: 1/2/3/4;
  }
  div:last-child {
    grid-area: 2/1/4/3;
    position: relative;
    z-index: 2;
  }
`;

const ThirdView = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 2;
`;
const ProjectWrapper = styled.div`
  padding-top: 1rem;
`;

const ProjectContainer = styled.div`
  padding-bottom: 2rem;
  span {
    color: var(--main);
  }
  h3 {
    color: var(--secondary);
  }
`;
const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  h1 {
    grid-area: 1 / 1 / 2 / 3;
  }
  a {
    grid-area: 2 / 1 /3 /2;
  }
`;
const OpacityWrapper = styled.div`
  opacity: 0.9;
`;
const Shadow = styled.div`
  margin-bottom: 1rem;

  span {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
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
