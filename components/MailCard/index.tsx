import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Indicator from '../Indicator';
import Mail from '../organism/Forms/Mail';

import Stepper from '../Stepper';
import MailProvider from '../MailProvider';

type Props = {
  open: boolean;
  choice: string;
  handler: () => void;
};

const modal = {
  in: {
    y: 0,
    display: 'block',
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1,
    },
    transitionEnd: {
      opacity: 1,
    },
  },
  out: {
    y: '50%',
    opacity: 0,
    transition: {
      duration: 1,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};
const button = {
  in: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  out: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function MailCard({ choice, handler, open }: Props) {
  const { t } = useTranslation('contact');

  return (
    <motion.div
      className={
        'absolute top-0 left-0 w-full min-h-screen bg-primaryLight dark:bg-primaryDark space-y-4 px-[10%] py-8'
      }
      variants={modal}
      initial={'out'}
      animate={open ? 'in' : 'out'}
    >
      <motion.button
        onClick={handler}
        className={`font-CaudexItalic flex items-center text-primaryDark dark:text-primaryLight`}
        variants={button}
      >
        <span
          className={'w-[26px] h-px bg-primaryDark dark:bg-primaryLight mr-2'}
        />
        {t(`back`)}
      </motion.button>

      <Indicator align={'center'}>{t(`${choice}`)}</Indicator>

      <MailProvider>
        {choice === 'project' ? <Stepper /> : <Mail />}
      </MailProvider>
    </motion.div>
  );
}
