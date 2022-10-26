import { useContext } from 'react';

import Step from '../Step';
import { FormContext } from '../MailProvider';

export default function Stepper() {
  const { activeStep, handleStepper, formData } = useContext(FormContext);

  return (
    <>
      <div
        className={
          'flex items-center py-4 text-primaryLight dark:text-primaryDark'
        }
      >
        <button
          className={`rounded-full  ${
            activeStep === 0
              ? 'bg-secondary'
              : 'bg-primaryDark dark:bg-primaryLight'
          } w-[42px] h-[42px] duration-700`}
          onClick={() => handleStepper && handleStepper(0)}
        >
          1
        </button>
        <div
          className={
            'flex-auto border-t-2 border-primaryDark relative dark:border-primaryLight overflow-hidden before:border-t-2 before:absolute before:w-full before:top-0 before:left-0 before:z-[2]'
          }
        />
        <button
          className={`rounded-full w-[42px] h-[42px] duration-700 ${
            activeStep === 1
              ? 'bg-secondary'
              : 'bg-primaryDark dark:bg-primaryLight'
          }`}
          onClick={() => handleStepper && handleStepper(1)}
        >
          2
        </button>
        <div
          className={
            'flex-auto border-t-2 border-primaryDark dark:border-primaryLight'
          }
        />
        <button
          className={`rounded-full w-[42px] h-[42px] duration-700 ${
            activeStep === 2
              ? 'bg-secondary'
              : 'bg-primaryDark dark:bg-primaryLight'
          }`}
          onClick={() => handleStepper && handleStepper(2)}
        >
          3
        </button>
      </div>

      <Step />
    </>
  );
}
