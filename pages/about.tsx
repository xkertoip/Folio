import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NextPage } from 'next';
const mainView3 = require('/images/mainView2.jpg');

const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const images: string[] = [
  require('/images/pesrpsective.jpeg'),
  require('/images/section2.jpg'),
  require('/images/home_background.jpg'),
];

const About: NextPage = () => {
  return <div></div>;
};

export default About;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});
