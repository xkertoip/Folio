import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import Layout from '../components/Layout';

import AnimatedTitle from '../components/AnimatedTitle';

const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Home: NextPage = () => {
  return (
    <Layout title={title} description={subtitle}>
      <AnimatedTitle
        title="Piotr Szczypka,"
        subtitle="Frontend developer"
        content="Web Developer"
      />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home'])),
  },
});
