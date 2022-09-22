import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, NextPage } from 'next';

import React, { useContext, useState } from 'react';
import Hero from '../components/Hero';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import DownloadButton from '../components/DownloadButton';
import mailImage from '/images/mail.svg';
import { Container, Section } from '../components/Containers';
import Footer from '../components/Footer';
import { request } from '../lib/datocms';
import { useQuerySubscription } from 'react-datocms';
import { Project } from '../lib/types';
import dynamic from 'next/dynamic';
import { SectionTitle } from '../components/Headings';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CursorContext } from '../components/CustomCursor/CursorManager';
import Indicator from '../components/Headings/Indicator';
import ShadowImageWrapper from '../components/atoms/ShadowImageWrapper';
const downloadImage = require('/images/download.svg');
const mainView1 = require('/images/mainView1.jpeg');
const mainView2 = require('/images/mainView2.jpg');
const mainView3 = require('/images/mainView4.jpg');
const logoLight = require('/images/logoPS_light.svg');
const logoDark = require('/images/logoPS_dark.svg');
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const ParallaxWithoutSSR = dynamic(
  () => import('../components/ParallaxEffect'),
  {
    ssr: false,
  }
);
const PerspectiveWithoutSSR = dynamic(
  () => import('../components/Perspective'),
  {
    ssr: false,
  }
);
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

const Home: NextPage = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);
  const { t } = useTranslation('common');
  const parallaxArray = ['JavaScript', 'React', 'Next', 'Gatsby', 'Wordpress'];
  const { theme } = useTheme();

  return (
    <div className={''}>
      <Hero />

      {/*        <div className={'px-4 '}>
          <div>
            <h2 className={'text-6xl font-Candal text-secondary'}>
              Hi!, Piotrek here
            </h2>
          </div>
          <div className={'z-[-1] top-[-50px] relative'}>
            <ShadowImageWrapper src={mainView1} alt={'main Image'} />
          </div>
        </div>*/}

      {/*     <Section>
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
            <motion.figure layoutId={'image'}>
              <Image src={mainView2} alt={'logo'} />
            </motion.figure>
          </OpacityWrapper>

          <div>
            <p>{t(`introduce`)}</p>
            <p>{t(`cvText`)}</p>
            <Link href={'/about'}>
              If you are intrested more about me, hold here
            </Link>
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
            {allProjects.map((project: Project) => (
              <ProjectContainer key={project.id}>
                <Link href={'/projects/' + project.slug}>
                  <a>
                    <ProjectImageWrapper>
                      <motion.figure layoutId={`image-${project.id}`}>
                        <Image
                          alt="project"
                          src={project.image.responsiveImage.src}
                          layout="responsive"
                          objectFit="contain"
                          objectPosition="top center"
                          width={400}
                          height={280}
                        />
                      </motion.figure>
                    </ProjectImageWrapper>
                    <h3>{project.title}</h3>
                    <h4>{project.adds}</h4>
                  </a>
                </Link>
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
          <ParallaxWithoutSSR array={parallaxArray} />
          <ParallaxWithoutSSR array={parallaxArray} reverse={true} />
        </div>
      </Section>
      <Section>
        <Container>
          <PerspectiveWithoutSSR>
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
          </PerspectiveWithoutSSR>
        </Container>
      </Section>
      <Footer />*/}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const formattedLocale = context.locale?.split('-')[0];
  const preview = context.preview;
  console.log(context.locale);
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
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'home',
      ])),
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
