import { createContext, ReactNode, useEffect, useState } from 'react';
import { useCycle } from 'framer-motion';

export type MenuContextType = {
  openMenu: boolean;

  handleOpen: () => void;
};

export const MenuContext = createContext<MenuContextType>({
  openMenu: false,
  handleOpen: () => {},
});

type Props = {
  children: ReactNode;
};

export default function MenuManager({ children }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };
  useEffect(() => {
    return () => {
      console.log(openMenu);
    };
  }, [openMenu]);

  return (
    <MenuContext.Provider
      value={{
        openMenu,
        handleOpen: handleOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
