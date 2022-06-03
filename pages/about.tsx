import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Index from '../components/Layout';
import Title from '../components/AnimatedTitle/Title';

const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const About: NextPage = () => {
  return (
    <Index title={title} description={subtitle}>
      <Title title="O mieniu" />
    </Index>
  );
};

export default About;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});
