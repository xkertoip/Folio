import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';
import Communication from '../components/Communication';

const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const Contact: NextPage = () => {
  return (
    <section>
      <Communication />
    </section>
  );
};

export default Contact;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'contact', 'home'])),
  },
});
