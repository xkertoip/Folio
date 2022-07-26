import styled from 'styled-components';
import { useQuerySubscription } from 'react-datocms';
import Layout from '../components/Layout';
import { request } from '../lib/datocms';
import { Project } from '../lib/types';
import React, { ReactElement, ReactNode } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import ProjectsLayout from '../components/Layout/projects';
import { NextPageWithLayout } from './_app';
import DefaultLayout from '../components/Layout';
import Home from './index';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const formattedLocale = locale?.split('-')[0];
  const graphqlRequest = {
    query: `
    {
        allProjects {
        introduction(locale: ${formattedLocale})
        slug
        title
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
  return (
    <>
      <div>
        {allProjects?.map(({ title, introduction, slug }: Project) => (
          <Wrapper key={title}>
            <Link href={`/projects/${slug}`}>{title}</Link>
            <div>{introduction}</div>
          </Wrapper>
        ))}
      </div>
      <ButtonContainer>
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonContainer>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProjectsLayout title={title} description={subtitle}>
      {page}
    </ProjectsLayout>
  );
};
export default Projects;

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;
const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  width: 300px;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: blue;
  color: white;
`;
