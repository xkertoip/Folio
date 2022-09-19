import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaQuery';
import DefaultLayout from '../components/Layout';
import { NextPageWithLayout } from './_app';
import { motion } from 'framer-motion';
import Image from 'next/image';
const mainView3 = require('/images/mainView4.jpg');

const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const images: string[] = [
  require('/images/pesrpsective.jpeg'),
  require('/images/section2.jpg'),
  require('/images/home_background.jpg'),
];

const About: NextPageWithLayout = () => {
  const constraintRef = useRef<HTMLDivElement>(null);
  const div1 = useRef<HTMLDivElement>(null);
  const div2 = useRef<HTMLDivElement>(null);
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  return (
    <div>
      <OpacityWrapper as={Shadow}>
        <motion.figure layoutId={'image'}>
          <Image src={mainView3} alt={'logo'} />
        </motion.figure>
      </OpacityWrapper>
    </div>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout title={title} description={subtitle}>
      {page}
    </DefaultLayout>
  );
};
export default About;

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

const View = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
`;
const Left = styled.div``;

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
