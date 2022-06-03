import { createContext, ReactNode, useState } from 'react';

export type HeaderContextType = {
  openMenu: boolean;
  setOpenMenu: () => void;
};

export const MenuContext = createContext<HeaderContextType>({
  openMenu: false,
  setOpenMenu: () => {},
});

type Props = {
  children: ReactNode;
};

export default function HeaderManager({ children }: Props) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOpenMenu = () => setOpenMenu(!openMenu);
  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu: handleOpenMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
