import { useState } from 'react';

export default function useStepper() {
  const [[open, choice], setChoice] = useState([false, '']);

  const handleChoice = (choice: string) => {
    setChoice([true, choice]);
  };
  const handleBack = () => {
    setChoice([false, choice]);
  };
  return { open, choice, handleChoice, handleBack };
}
