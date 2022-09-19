import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import React, { Component, ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import GlobalStyles from '../styles/globalStyles';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Header from '../components/Header';
import { AnimateSharedLayout } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import HeaderManager from '../components/Header/HeaderManager';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const BackgroundWithoutSSR = dynamic(() => import('../components/Background'), {
  ssr: false,
});

const SmoothScrollWithoutSSR = dynamic(
  () => import('../components/SmoothScroll'),
  {
    ssr: false,
  }
);

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

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  const url = `https://piotr.szczypka.com${router.route}`;
  const { asPath } = useRouter();

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
      <ThemeProvider>
        <GlobalStyles />
        <HeaderManager>
          <CustomCursor />
          <Header />

          <BackgroundWithoutSSR />
          <SmoothScrollWithoutSSR>
            <AnimateSharedLayout>
              <Component {...pageProps} cannonical={url} key={url} />
            </AnimateSharedLayout>
          </SmoothScrollWithoutSSR>
        </HeaderManager>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
