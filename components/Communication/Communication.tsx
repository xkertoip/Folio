import { useTranslation } from 'next-i18next';
import Indicator from '../Indicator';
import ContactPicker from '../ContactPicker';
import SocialMedia from '../SocialMedia';
import React from 'react';
import SectionTitle from '../SectionTitle';

export default function Communication() {
  const { t } = useTranslation('contact');
  return (
    <div
      className={
        'px-[10%] py-8 min-h-screen relative overflow-y-scroll sm:overflow-hidden'
      }
    >
      <div className={'pb-8 '}>
        <SectionTitle>
          {t('title')}
          <span className={'text-secondary'}>!</span> <br />
        </SectionTitle>
        <Indicator>
          N&#176;&
          <br />
          {t('leaveMessage')}!
        </Indicator>
      </div>

      <ContactPicker />
    </div>
  );
}
