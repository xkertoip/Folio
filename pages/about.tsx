import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout/Layout';
import Title from '../components/AnimatedTitle/Title';

const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const About: NextPage = () => {
  return (
    <Layout title={title} description={subtitle}>
      <Title title="O mieniu" />
    </Layout>
  );
};

export default About;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});
