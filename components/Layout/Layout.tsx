import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const Layout = ({ children, title, description }: Props): JSX.Element => (
  <>
    <NextSeo
      title={title}
      description={description}
      openGraph={{ title, description }}
    />
    <main>{children}</main>
  </>
);

export default Layout;
