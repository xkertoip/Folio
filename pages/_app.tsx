import { AppProps } from 'next/app';
import React, { Component, useContext } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import SmoothScroll from '../components/SmoothScroll';
import MenuManager, { MenuContext } from '../components/Header/MenuManager';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Background from '../components/Background';

const BackgroundWithoutSSR = dynamic(() => import('../components/Background'), {
  ssr: false,
});

const variants = {
  in: {
    opacity: 0,
    y: 100,
    transition: {
      delay: 0.5,
      ease: 'easeInOut',
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  out: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const url = `https://piotr.szczypka.com${router.route}`;

  return (
    <>
      <DefaultSeo
        titleTemplate="%s - Piotr Szczypka"
        openGraph={{
          type: 'website',
          locale: router.locale,
          url,
          site_name: 'Piotr Szczypka | piotr.szczypka.com',
          images: [],
        }}
        canonical={url}
      />
      <ThemeProvider enableSystem={true} attribute={'class'}>
        <MenuManager>
          <CustomCursor />

          <div className={'bg-primary  dark:bg-secondary h-full'}>
            <div className={'pr-[50px] md:pr-[80px]'}>
              <Header />
              <SmoothScroll>
                <div className={'pr-[50px] md:pr-[80px]'}>
                  <AnimatePresence>
                    <Component {...pageProps} key={router.route} />
                  </AnimatePresence>
                </div>
              </SmoothScroll>
            </div>
            <aside
              className={'fixed w-[50px] md:w-[80px] h-screen top-0 right-0'}
            >
              <Background />
            </aside>
          </div>
        </MenuManager>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
