import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout/Layout';

const Home: NextPage = () => {
  const { t } = useTranslation('home');
  const title = 'Home';
  const description = `${t('title')} - ${t('description')}`;
  return (
    <Layout title={title} description={description}>
      {t('title')}
    </Layout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
});
