import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import GlobalStyles from '../styles/globalStyles';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Header from '../components/Header/Header';

function Folio({ Component, pageProps, router }: AppProps) {
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
        <Header />
        <Component {...pageProps} cannonical={url} key={url} />
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(Folio);
