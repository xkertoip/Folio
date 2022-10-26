import Indicator from '../Indicator';
import ShadowImageWrapper from '../ShadowImageWrapper';
import Status from '../Status';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
const mainView2 = require('/images/me1.jpeg');
import Perspective from '../Perspective';
import { useEffect } from 'react';

const Hero = ({ ...props }) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <div className={'px-4 lg:px-[10%] relative min-h-[100vh] grid pb-8'}>
      <div className={'sm:flex sm:gap-8 '}>
        <div className={'sm:flex-1 '}>
          <div className={' pt-8'}>
            <h1
              className={
                'text-6xl sm:text-8xl md:text-9xl text-primaryDark dark:text-primaryLight font-CaudexItalic '
              }
            >
              ..hello
            </h1>
            <h1
              className={
                'text-6xl sm:text-8xl md:text-9xl text-primaryDark dark:text-primaryLight font-CaudexItalic '
              }
            >
              ..name
            </h1>
          </div>

          <Indicator align={'right'}>
            N&#176;1
            <br />
            ..greetings
          </Indicator>
        </div>

        <div
          className={
            'min-w-[200px] max-w-[400px] sm:flex-1 sm:mt-auto pt-8 mx-auto'
          }
        >
          <ShadowImageWrapper>
            <Perspective>
              <Image
                src={mainView2}
                alt={'Piotr Szczypka'}
                layout={'responsive'}
                objectFit={'contain'}
              />
            </Perspective>
          </ShadowImageWrapper>
        </div>
      </div>
      <div className={'mt-8 sm:my-auto'}>
        <Status />
      </div>
      <span
        className={`absolute top-0 left-[25%] w-px h-[100%] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:bg-secondary before:w-full before:h-full before:animate-transVertical before:opacity-40 before:-z-[1]`}
      />
      <span
        className={`absolute top-[60%] h-px w-[100%] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:bg-secondary before:w-full before:h-full before:animate-transHorizontal before:opacity-40 before:-z-[1]`}
      />
    </div>
  );
};

export default Hero;
