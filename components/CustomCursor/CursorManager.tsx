import { createContext, ReactNode, useState } from 'react';
import { MenuContext } from '../Header/MenuManager';

export type CursorContextType = {
  isHover: boolean;
  setIsHover: () => void;
};

export const CursorContext = createContext<CursorContextType>({
  isHover: false,
  setIsHover: () => {},
});

type Props = {
  children: ReactNode;
};

export default function CursorManager({ children }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleSetHover = () => setIsHover(!isHover);

  return (
    <CursorContext.Provider value={{ isHover, setIsHover: handleSetHover }}>
      {children}
    </CursorContext.Provider>
  );
}
