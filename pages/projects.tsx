import styled from 'styled-components';
import { useQuerySubscription } from 'react-datocms';
import { request } from '../lib/datocms';

import React, { ReactNode } from 'react';
import { GetStaticProps } from 'next';
import ProjectsLayout from '../components/Layout/project';
import { NextPageWithLayout } from './_app';
import useWindowDimensions from '../utils/useWindowDimensions';
import FullPage from '../components/Slider/fullPage';
import { device } from '../styles/mediaQuery';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const formattedLocale = locale?.split('-')[0];
  const graphqlRequest = {
    query: `
    {
        allProjects(orderBy: order_ASC) {
        introduction(locale: ${formattedLocale})
        slug
        id
        title
        order
        technology
        description
        image {
      responsiveImage {
        src
      }
    }
        }
    }
   `,
    preview,
  };
  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
};

const Projects: NextPageWithLayout = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);

  const { windowHeight } = useWindowDimensions();

  return (
    <>
      <Wrapper
        style={{
          height: windowHeight,
        }}
      >
        <FullPage array={allProjects} />
      </Wrapper>
    </>
  );
};

/*Projects.getLayout = function getLayout(page: ReactNode) {
  return (
    <ProjectsLayout title={title} description={subtitle}>
      {page}
    </ProjectsLayout>
  );
};*/
export default Projects;

const Wrapper = styled.div`
  overflow-y: hidden;
  width: 100%;
  height: 100vh;
  @media only screen and ${device.tablet} {
    min-height: 100vh;
  }
`;
