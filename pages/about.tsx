import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import React, { useState } from 'react';
import FollowImage from '../components/FollowImage';
import OnView from '../components/OnView';
import AnimatedTitle from '../components/AnimatedSection';
import styled from 'styled-components';
import { device } from '../styles/mediaQuery';

const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const images: string[] = [
  require('/images/pesrpsective.jpeg'),
  require('/images/section2.jpg'),
  require('/images/home_background.jpg'),
];

const About: NextPage = () => {
  const [index, setIndex] = useState(0);

  const handleIndex = (i: number) => {
    setIndex(i);
  };
  return (
    <Layout title={title} description={subtitle}>
      <FollowImage index={index} array={images} />
      <OnView setIndex={() => handleIndex(0)}>
        <AnimatedTitle
          title="Piotr Szczypka,"
          subtitle="Frontend developer"
          content="Web Developer"
        />
      </OnView>
      <Container>
        <OnView setIndex={() => handleIndex(1)}>
          <h2>Cześć, jestem Piotrek!</h2>
          <p>
            Jestem frontend developerem, obecnie koduję w React, z
            wykorzystaniem frameworka Next.js, do budowania stron
            wykorzystujących SSR w celu podniesienia rezultatów wyszukiwania
            przez roboty.
          </p>
        </OnView>
      </Container>

      <Container>
        <OnView setIndex={() => handleIndex(2)}>
          <h2>Cześć, jestem Piotrek!</h2>
          <p>
            Jestem frontend developerem, obecnie koduję w React, z
            wykorzystaniem frameworka Next.js, do budowania stron
            wykorzystujących SSR w celu podniesienia rezultatów wyszukiwania
            przez roboty.
          </p>
        </OnView>
      </Container>
    </Layout>
  );
};

export default About;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 64px 16px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: stretch;
  @media only screen and ${device.tablet} {
    padding: 0 10%;
    justify-content: center;
  }
`;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});
