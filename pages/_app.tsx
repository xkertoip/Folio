import { AppProps } from 'next/app';
import React, { Component } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { CustomCursor } from '../components/CustomCursor';
import { MenuManager } from '../components/Menu';
import Transition from '../components/Transition';
import { Layout } from '../components/Layout';
const App = ({ Component, pageProps, router }: AppProps) => {
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
        <CustomCursor />
        <MenuManager>
          <Layout>
            <Transition>
              <Component {...pageProps} />
            </Transition>
          </Layout>
        </MenuManager>
      </ThemeProvider>
    </>
  );
};

export default App;
