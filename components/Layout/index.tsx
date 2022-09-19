import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
const mainView3 = require('/images/mainView4.jpg');

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

function DefaultLayout({ children, title, description }: Props) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      {/*      <Wrapper
        key={asPath}
        variants={variants}
        animate="inactive"
        initial="in"
        exit="out"
        transition={{ type: 'linear' }}
      >*/}
      <Wrapper>{children}</Wrapper>
    </>
  );
}

export default DefaultLayout;

const Wrapper = styled(motion.div)`
  position: relative;
`;

const OpacityWrapper = styled.div`
  opacity: 0.9;
`;
const Shadow = styled.div`
  margin-bottom: 1rem;

  span {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
`;
