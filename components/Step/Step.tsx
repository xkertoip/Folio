import { useContext } from 'react';
import { FormContext } from '../MailProvider';
import { AnimatePresence, motion } from 'framer-motion';

import Budget from '../organism/Forms/Budget';
import Project from '../organism/Forms/Project';
import Mail from '../organism/Forms/Mail';

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

export default function Step() {
  const { activeStep } = useContext(FormContext);
  let stepContent;

  switch (activeStep) {
    case 0:
      stepContent = <Budget />;
      break;
    case 1:
      stepContent = <Project />;
      break;
    case 2:
      stepContent = <Mail />;
      break;
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={wrapper}
          exit={'out'}
          initial={'out'}
          animate={'in'}
          key={activeStep}
        >
          {stepContent}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
