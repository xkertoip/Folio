import { createContext, ReactNode, useState } from 'react';

interface mailForm {
  user_budget: number;
  user_email: string;
  user_choice: string;
  user_message: string;
}

interface FormContextInterface {
  activeStep: number;
  handleStepper?: (value: number) => void;
  formData?: mailForm;
  handleMail?: (email: string, msg: string) => void;
  handleSubject?: (value: string) => void;
  handleBudget?: (value: number) => void;
}
const defaultState = {
  activeStep: 0,
};

export const FormContext = createContext<FormContextInterface>(defaultState);

type Props = {
  children: ReactNode;
};

export default function MailProvider({ children }: Props) {
  const [activeStep, setActiveStep] = useState(defaultState.activeStep);
  const [formData, setFormData] = useState<mailForm>({
    user_budget: 0,
    user_choice: '',
    user_email: '',
    user_message: '',
  });

  const handleStepper = (value: number) => {
    setActiveStep(value);
  };
  const handleSubject = (value: string) => {
    setFormData({ ...formData, user_choice: value });
  };
  const handleBudget = (value: number) => {
    setFormData({ ...formData, user_budget: value });
  };
  const handleMail = (email: string, msg: string) => {
    setFormData({ ...formData, user_email: email, user_message: msg });
  };
  return (
    <FormContext.Provider
      value={{
        activeStep,
        handleStepper,
        formData,
        handleBudget,
        handleSubject,
        handleMail,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
