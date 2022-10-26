import React, { ReactNode } from 'react';
import { Menu } from '../Menu';
import TypeWriter from '../TypeWriter';
import SmoothScroll from '../SmoothScroll';
type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={'bg-primaryLight  dark:bg-primaryDark'}>
        <aside
          className={'fixed w-[50px] md:w-[80px] h-screen top-0 right-0 z-50'}
        >
          <Menu />
          <TypeWriter />
        </aside>
        <SmoothScroll>
          <div className={'pr-[50px] md:pr-[80px]'}>{children}</div>
        </SmoothScroll>
      </div>
    </>
  );
};

export default Layout;
