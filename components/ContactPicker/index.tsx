import React from 'react';
import { motion } from 'framer-motion';
import SocialMedia from '../SocialMedia';
import { useTranslation } from 'next-i18next';
import MailCard from '../MailCard';
import FancyButton from '../FancyButton';
import useStepper from '../../utils/useStepper';

const wrapper = {
  in: {
    y: 0,
    opacity: 1,
    display: 'block',
    transition: {
      duration: 1,
      delay: 1,
    },
  },
  out: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 1,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};
export default function ContactPicker() {
  const { t } = useTranslation('contact');
  const { open, handleChoice, choice, handleBack } = useStepper();

  return (
    <>
      <motion.div>
        <div className={' overflow-hidden'}>
          <div className={'grid gap-8 py-4 justify-center'}>
            <FancyButton onClick={() => handleChoice('hi')} type={'button'}>
              {t('hi')}
            </FancyButton>

            <FancyButton
              onClick={() => handleChoice('project')}
              type={'button'}
            >
              {t('project')}
            </FancyButton>

            <FancyButton onClick={() => handleChoice('job')} type={'button'}>
              {t('job')}
            </FancyButton>
          </div>

          <motion.div
            variants={wrapper}
            initial={'in'}
            animate={open ? 'out' : 'in'}
            className={
              'font-CaudexItalic text-primaryDark dark:text-primaryLight'
            }
          >
            <h2 className={'mt-8  text-2xl uppercase tracking-[2px] '}>
              {t(`address`)}
            </h2>
            <p className={'text-xl font-RedHatText text-secondary '}>
              Kasinka Mała 648
            </p>
            <p className={'font-RedHatText text-secondary '}>
              34-734, Kasinka Mała
            </p>
            <h2 className={'mt-8 text-2xl  uppercase tracking-[2px] '}>
              {t(`phone`)}
            </h2>
            <p className={'font-RedHatText text-secondary  '}>
              <a href={'tel:+48536777364'}>+48536777364</a>
            </p>
            <h2 className={' mt-8 text-2xl uppercase tracking-[2px] '}>
              E-m@il
            </h2>
            <p className={'font-RedHatText text-secondary  '}>
              <a href={'mailto:piotr.szczypka@vp.pl'}>piotr.szczypka@vp.pl</a>
            </p>
            <h2 className={' mt-8 text-2xl uppercase tracking-[2px] '}>
              {t(`socials`)}
            </h2>
            <div className={'flex py-4 gap-4'}>
              <SocialMedia />
            </div>
          </motion.div>
        </div>
      </motion.div>
      <MailCard choice={choice} handler={handleBack} open={open} />
    </>
  );
}
