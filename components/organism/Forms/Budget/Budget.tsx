import { Field, Form, Formik } from 'formik';
import FancyButton from '../../FancyButton';
import { FormContext } from '../../../MailProvider';
import { ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function Budget() {
  const { t } = useTranslation('contact');
  const { activeStep, handleFormData, handleStepper, formData } =
    useContext(FormContext);
  const [budget, setBudget] = useState(1);

  const handleBudget = (event: ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(event.target.value));
  };

  const validateBudget = (value: number) => {
    let error;
    if (value < 500) {
      error = 'requiredBudget';
    }
    return error;
  };
  return (
    <Formik
      initialValues={{
        budget: 0,
      }}
      onSubmit={(values) => {
        const data = { ...formData, ...values };
        if (budget > 500) {
          handleFormData && handleFormData(data);
          handleStepper && handleStepper(activeStep + 1);
          alert(JSON.stringify(values, null, 2));
          console.log('poiszlo');
        } else {
          alert(JSON.stringify(values, null, 2));
          console.log('nie poiszlo');
        }
      }}
    >
      {({ errors }) => (
        <Form>
          <h2 className={'text-left text-xl'}>{t('budget')}</h2>
          <div className={'py-8 text-secondary text-right'}>
            <span className={'w-[42px] h-[42px] text-2xl'}>
              {budget.toFixed(0)}
            </span>

            <Field
              as={'input'}
              type={'range'}
              name={'user_budget'}
              min={'1'}
              max={'40000'}
              onChange={handleBudget}
              value={budget}
              className={'w-full py-4 caret-neutral bg-transparent'}
              validate={validateBudget}
            />
          </div>
          {errors.budget && <h3>{errors.budget}</h3>}
          <div className={'flex justify-end'}>
            <FancyButton type={'submit'}>{t('confirm')}</FancyButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
