import { Field, Form, Formik } from 'formik';
import FancyButton from '../../FancyButton';
import { FormContext } from '../../../MailProvider';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function Project() {
  const { t } = useTranslation('contact');
  const { activeStep, handleFormData, handleStepper, formData } =
    useContext(FormContext);
  const [subject, setSubject] = useState('');

  const handleSubject = (value: string) => {
    setSubject(value);
  };

  const validateSubject = (value: string) => {
    let error;
    if (!value) {
      error = 'requiredBudget';
    } else if (value === '') {
      error = 'requiredBudget';
    }

    return error;
  };
  return (
    <Formik
      initialValues={{
        subject: '',
      }}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        if (validateSubject(subject) !== 'requiredBudget') {
          handleFormData && handleFormData(data);
          handleStepper && handleStepper(activeStep + 1);
          alert(JSON.stringify(values, null, 2));
          console.log('poiszlo');
        } else console.log('nie poiszlo');
      }}
    >
      {({ errors }) => (
        <Form>
          <h2 className={' text-left text-xl'}>{t('subject')}</h2>
          <div className={'flex flex-col gap-6 py-4'}>
            <FancyButton
              onClick={() => {
                handleSubject('website');
              }}
              type={'submit'}
            >
              {t('website')}
            </FancyButton>

            <FancyButton
              onClick={() => {
                handleSubject('mobile');
              }}
              type={'submit'}
            >
              {t('mobileApp')}
            </FancyButton>

            <FancyButton
              onClick={() => {
                handleSubject('invasion');
              }}
              type={'submit'}
            >
              {t('invasion')}
            </FancyButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
