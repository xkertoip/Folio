import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles/mediaQuery';
import DefaultLayout from '../components/Layout';
import { NextPageWithLayout } from './_app';
import { motion } from 'framer-motion';

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
    <motion.div
      style={{ display: 'inline-flex' }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          if (div1.current) {
            console.log('tutu lewo', swipe);
            div1.current.scrollIntoView({
              behavior: 'smooth',
              inline: 'start',
            });
          }
        } else if (swipe > swipeConfidenceThreshold) {
          if (div2.current) {
            console.log('tutu dugie lewo', swipe);
            div2.current.scrollIntoView({
              behavior: 'smooth',
              inline: 'start',
            });
          }
        }
      }}
    >
      <div ref={div1} style={{ minWidth: '100vw', height: '100vh' }}>
        {' '}
        siema
      </div>
      <div ref={div2} style={{ minWidth: '100vw', height: '100vh' }}>
        {' '}
        siema2
      </div>
    </motion.div>
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
