import { motion } from 'framer-motion';
import Image from 'next/image';
const spinner = require('/images/spinner.svg');
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import FancyButton from '../FancyButton';
import Link from 'next/link';

const info = {
  in: {
    y: 0,
    opacity: 1,
    zIndex: 2,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  out: {
    y: 25,
    zIndex: -1,
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function Status() {
  const { t } = useTranslation('home');
  const [status, setStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleStatus = () => {
    if (status === '') {
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
        setStatus('available');
      }, 3000);
    }
  };
  return (
    <div className={'  text-left sm:max-w-[350px]'}>
      <div className={'relative'}>
        <motion.div
          variants={info}
          animate={isChecking ? 'out' : 'in'}
          initial={'out'}
          className={''}
        >
          <motion.div
            variants={info}
            animate={!isChecking ? 'in' : 'out'}
            className={'space-y-4'}
          >
            <h2
              className={`text-base text-xl text-primaryDark dark:text-primaryLight`}
            >
              {status === '' ? (
                <>{t('cooperation')}</>
              ) : (
                <>
                  {t('currentStatus')}
                  <span
                    className={`text-base text-secondary text-xl font-CaudexItalic animate-pulse`}
                  >
                    :&nbsp;{t(`${status}`)}
                  </span>
                </>
              )}
            </h2>

            <h2
              className={`text-base text-primaryDark dark:text-primaryLight sm:text-xl `}
            >
              {status !== ''
                ? `${t(
                    `${
                      status === 'available'
                        ? 'greetingsAvailable'
                        : 'greetingsInaccessible'
                    }`
                  )}`
                : `${t('checkAvailable')}`}
            </h2>

            <div className={'flex justify-end'}>
              <FancyButton onClick={handleStatus} type={'button'}>
                {status !== '' ? (
                  <Link href={'/contact'}>{t('message')}</Link>
                ) : (
                  <>{t('check')}</>
                )}
              </FancyButton>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={info}
          animate={isChecking ? 'in' : 'out'}
          initial={'out'}
          className={
            'absolute top-0 left-0 w-full h-full flex justify-center align-center m-auto'
          }
        >
          <Image src={spinner} alt={'spinner'} className={'animate-spin'} />
        </motion.div>
      </div>
    </div>
  );
}
