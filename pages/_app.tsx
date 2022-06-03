import { AppProps } from 'next/app';
import '../styles/globals.css';
import GlobalStyles from '../styles/globalStyles';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Header from '../components/Header';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import HeaderManager from '../components/Header/HeaderManager';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

declare const window: any;

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
        <HeaderManager>
          <CustomCursor />
          <Header />
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} cannonical={url} key={url} />
          </AnimatePresence>
        </HeaderManager>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(Folio);
