import {
  AppContext,
  AppInitialProps,
  AppLayoutProps,
  AppProps,
} from 'next/app';
import type { NextComponentType, NextPage } from 'next';
import { Component, ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import GlobalStyles from '../styles/globalStyles';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Header from '../components/Header';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import HeaderManager from '../components/Header/HeaderManager';
import Background from '../components/Background';
import dynamic from 'next/dynamic';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const BackgroundWithoutSSR = dynamic(() => import('../components/Background'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
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
      <ThemeProvider>
        <GlobalStyles />
        <HeaderManager>
          <CustomCursor />
          <Header />
          <main>
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              {getLayout(
                <Component {...pageProps} cannonical={url} key={url} />
              )}
            </AnimatePresence>
          </main>
        </HeaderManager>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
