import Layout from '../../components/Layout';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";
import { GetStaticPaths, GetStaticProps } from 'next';
import { Project } from '../../lib/types';
import { getAllProjects, request } from '../../lib/datocms';
import React from 'react';

export const getStaticPaths: GetStaticPaths = async (context) => {
  const allProjects = await getAllProjects();
  const pathsArray: { params: { slug: string }; locale: string }[] = [];
  allProjects.map((project) => {
    context.locales?.map((language) => {
      pathsArray.push({ params: { slug: project.slug }, locale: language });
    });
  });

  return {
    paths: pathsArray,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const formattedLocale = context.locale?.split('-')[0];
  const PROJECT_QUERY = `
query PROJECT_QUERY($slug: String) {
  project(filter: {slug: {eq: $slug}}, locale: ${formattedLocale}) {
    projectInfo
    projectId
    projectTitle
    projectTechnology
    slug
  }
}
`;
  const data = await request({
    query: PROJECT_QUERY,
    variables: { slug: context.params?.slug },
  });
  const project = data?.project;
  return {
    props: {
      project,
    },
  };
};

const ProjectPage = ({ project }: { project: Project }) => {
  return (
    <Layout title={title} description={subtitle}>
      <div>{project?.projectTitle}</div>
      <div>{project.projectId}</div>
      <div>{project.projectInfo}</div>
    </Layout>
  );
};
export default ProjectPage;
