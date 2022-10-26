import Indicator from '../Indicator';
import SectionTitle from '../SectionTitle';
import React from 'react';

import { useTranslation } from 'next-i18next';
import FancyButton from '../FancyButton';
import CardShadow from '../CardShadow';
import Link from 'next/link';
import Perspective from '../Perspective';

/*const PerspectiveWithoutSSR = dynamic(() => import('../Perspective'), {
  ssr: false,
});*/

function Summary() {
  const { t } = useTranslation('home');
  return (
    <>
      <div className={' pb-16 pr-[10%] sm:pr-[20% -top-[120px] relative'}>
        <CardShadow>
          <SectionTitle align={'text-left'}>{t('contactInfo')}</SectionTitle>
          <Indicator align={'text-right'}>
            N&#176;6
            <br />
            {t('contact')}
          </Indicator>
          <div className={'py-16 justify-center flex'}>
            <FancyButton type={'button'}>
              <Link href={'/contact'}>{t('contactButton')}</Link>
            </FancyButton>
          </div>
        </CardShadow>
      </div>
    </>
  );
}

export default Summary;
