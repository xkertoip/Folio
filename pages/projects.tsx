import { GetServerSideProps, NextPage } from 'next';

import styled from 'styled-components';
import { projectsData } from '../public/projectData';
import Layout from '../components/Layout';
import { getAllProjects } from '../lib/datocms';
import { Project } from '../lib/types';
import React from 'react';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Projects: React.FC<{ allProjects: Project[] }> = ({ allProjects }) => {
  const sortedArray = allProjects?.sort((a, b) => a.id - b.id);
  return (
    <Layout title={title} description={subtitle}>
      <div>
        {sortedArray?.map(({ slug, id }, i) => (
          <Wrapper key={i}>{slug}</Wrapper>
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const allProjects = await getAllProjects();
  console.log(locale, allProjects);
  return {
    props: {
      allProjects,
    },
  };
};
