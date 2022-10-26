import ShadowImageWrapper from '../ShadowImageWrapper';
import SectionTitle from '../SectionTitle';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Indicator from '../Indicator';
import Image from 'next/image';
import FancyButton from '../FancyButton';
import CardShadow from '../CardShadow';
import Perspective from '../Perspective';
import Link from 'next/link';

const mainView1 = require('/images/mainView2.jpg');

const Introduce = () => {
  const { t } = useTranslation('home');
  return (
    <div className={'pr-[10%] sm:pr-[20%] z-[10] relative'}>
      <CardShadow>
        <SectionTitle align={'right'}>{t('positive')}</SectionTitle>

        <Indicator>
          N&#176;2
          <br />
          {t('intro')}
        </Indicator>

        <div className={'md:flex justify-between gap-8 '}>
          <div className={' sm:flex-1 sm:grow pt-8 max-w-[400px] my-auto'}>
            <ShadowImageWrapper>
              <Perspective>
                <Image
                  src={mainView1}
                  alt={'Piotr Szczypka'}
                  layout={'responsive'}
                  objectFit={'contain'}
                />
              </Perspective>
            </ShadowImageWrapper>
          </div>
          <motion.div
            className={' pt-8  sm:flex-1 sm:grow my-auto max-w-[400px]'}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
            }}
          >
            <div
              className={
                'space-y-8 text-primaryDark dark:text-primaryLight sm:text-xl '
              }
            >
              <p>{t(`introduce`)}</p>
              <p>{t(`cvText`)}</p>

              <div className={'text-right'}>
                <FancyButton type={'button'}>
                  <Link
                    href={'/CV21.pdf'}
                    target={'_blank'}
                    download={'CV_Piotr_Szczypka.pdf'}
                  >
                    {t('download')}
                  </Link>
                </FancyButton>
              </div>
            </div>
          </motion.div>
        </div>
      </CardShadow>
    </div>
  );
};
export default Introduce;
