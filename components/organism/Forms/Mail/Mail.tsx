import { Form, Field, Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { MailValues } from '../../../../lib/types';
import FancyButton from '../../../FancyButton';

interface Props {
  budget?: number;
  subject?: string;
}

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

const Mail = ({ budget, subject }: Props) => {
  const [[mail, text], setValid] = useState([false, false]);
  const { t } = useTranslation('contact');

  const initialValues: MailValues = {
    user_budget: budget,
    user_email: '',
    user_choice: subject,
    user_message: '',
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = 'requiredMail';
      setValid([false, text]);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'invalidMail';
      setValid([false, text]);
    } else {
      setValid([true, text]);
    }
    return error;
  };
  const validateText = (value: string) => {
    let error;
    if (!value) {
      error = 'requiredText';
      setValid([mail, false]);
    } else {
      setValid([mail, true]);
    }
    return error;
  };

  const sendHandler = () => {
    text && mail && console.log('nie poszlo');
  };
  return (
    <>
      <motion.div variants={wrapper}>
        <p className={'text-neutral py-4 text-left'}>
          Can you tell me something more about your proposition?
        </p>

        {budget !== 0 ? (
          <>
            <h3>{budget}</h3>
          </>
        ) : (
          <>
            <h3>nic nie ma</h3>
          </>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log({ values });
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, touched, isValidating }) => (
            <Form>
              <Field
                as={'input'}
                className={'drop-shadow-lg bg-active w-full p-2 mb-4'}
                placeholder={'email'}
                id={'user_email'}
                name={'user_email'}
                validate={validateEmail}
              />
              {errors.user_email && touched.user_email && (
                <div>{errors.user_email}</div>
              )}
              <Field
                as={'textarea'}
                className={
                  'drop-shadow-lg bg-active w-full p-2 mb-4 resize-none'
                }
                placeholder={'message'}
                name={'user_message'}
                id={'user_message'}
                validate={validateText}
                rows={6}
              />
              {errors.user_message && touched.user_message && (
                <div>{errors.user_message}</div>
              )}
              <div className={'text-right'}>
                <FancyButton type={'submit'}>{t('send')}</FancyButton>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </>
  );
};

export default Mail;
