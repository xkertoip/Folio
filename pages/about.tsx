import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout/Layout';

const About: NextPage = () => {
  const { t } = useTranslation('about');
  const title = 'Home';
  const description = `${t('title')} - ${t('description')}`;
  return (
    <Layout title={title} description={description}>
      {t('about')}
    </Layout>
  );
};

export default About;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});
