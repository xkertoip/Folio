import styled from 'styled-components';
import Layout from '../components/Layout';
import { getAllProjects, request } from '../lib/datocms';
import { Project } from '../lib/types';
import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Projects = ({ allProjects }: { allProjects: Project[] }) => {
  const sortedArray = allProjects?.sort((a, b) => a.projectId - b.projectId);
  return (
    <Layout title={title} description={subtitle}>
      <div>
        {sortedArray?.map(({ slug, projectId, projectInfo }, i) => (
          <Wrapper key={i}>
            <Link href={slug}>{slug}</Link>
            <div>{projectId}</div>
            <div>{projectInfo}</div>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const formattedLocale = context.locale?.split('-')[0];
  const ALL_PROJECTS_QUERY = `
query ALL_PROJECTS_QUERY {
   allProjects {
    projectInfo(locale: ${formattedLocale})
    slug
    projectTitle
    projectAdds
    projectId
  }
}
  
   `;
  const data = await request({
    query: ALL_PROJECTS_QUERY,
  });
  const allProjects = data?.allProjects;
  return {
    props: {
      allProjects,
    },
  };
};
