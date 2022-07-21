import styled from 'styled-components';
import { useQuerySubscription } from 'react-datocms';
import Layout from '../components/Layout';
import { request } from '../lib/datocms';
import { Project } from '../lib/types';
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
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

const Projects = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);
  return (
    <Layout title={title} description={subtitle}>
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
    </Layout>
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
