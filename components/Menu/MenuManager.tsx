import { createContext, ReactNode, useState } from 'react';

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

const MenuManager = ({ children }: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

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
};
export default MenuManager;
