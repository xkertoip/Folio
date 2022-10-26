import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { NextPage } from 'next';
import ShadowImageWrapper from '../components/ShadowImageWrapper';
import { SharedLayout } from '../components/Layout';
import Image from 'next/image';

const mainView2 = require('/images/mainView1.jpeg');
const title = 'About';
const subtitle = 'Creative, stubborn, inquisitive - It`s me ';

const images: string[] = [
  require('/images/pesrpsective.jpeg'),
  require('/images/section2.jpg'),
  require('/images/home_background.jpg'),
];

const About: NextPage = () => {
  return (
    <SharedLayout title={title} description={subtitle}>
      <div className={'min-h-screen'}>
        <h2>tu bedzie cos </h2>
        <div className={'w-[200px] h-[200px] relative py-2'}>
          <ShadowImageWrapper>
            <Image src={mainView2} alt={'Piotrke'} />
          </ShadowImageWrapper>
        </div>
        {/* Zdjecie, ktore za mna jezdzi w tle, troche textu o sobie, pare innych zdjec ihover*/}
      </div>
    </SharedLayout>
  );
};

export default About;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
});
