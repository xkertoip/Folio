import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import AnimatedTitle from '../components/AnimateTitle';
import styled from 'styled-components';
import React, { useState } from 'react';
import Link from 'next/link';
import AnimatedImage from '../components/AnimateImage';
import OnView from '../components/OnView';
import { device } from '../styles/mediaQuery';

const images: string[] = [
  require('/images/section_bg.jpg'),
  require('/images/section2.jpg'),
  require('/images/home_background.jpg'),
];

const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Home: NextPage = () => {
  const [index, setIndex] = useState(0);

  const handleIndex = (i: number) => {
    setIndex(i);
  };

  return (
    <Layout title={title} description={subtitle}>
      <AnimatedImage index={index} array={images} />

      <OnView setIndex={() => handleIndex(0)}>
        <AnimatedTitle
          title="Piotr Szczypka,"
          subtitle="Frontend developer"
          content="Web Developer"
        />
      </OnView>
      <OnView setIndex={() => handleIndex(1)}>
        <Container>
          <h2>Cześć, jestem Piotrek!</h2>
          <p>
            Jestem frontend developerem, obecnie koduję w React, z
            wykorzystaniem frameworka Next.js, do budowania stron
            wykorzystujących SSR w celu podniesienia rezultatów wyszukiwania
            przez roboty.
          </p>
        </Container>
      </OnView>

      <OnView setIndex={() => handleIndex(-1)}>
        <Choice>
          <Link href="/about">Poznaj mnie!</Link>
          <Link href="/contact">Napisz do mnie!</Link>
        </Choice>
      </OnView>
    </Layout>
  );
};

export default Home;

const Container = styled.div`
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

const Choice = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;

  a {
    width: 100%;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;
    font-size: 4rem;
    :hover {
      background-color: var(--main);
      color: var(--secondaryColor);
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  a {
    :before {
    }
  }
`;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
});
