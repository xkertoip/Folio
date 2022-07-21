import Layout from '../../components/Layout';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";
import { projectsData } from '../../public/projectData';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { Project } from '../../lib/types';
import { getAllProjects, getProject, request } from '../../lib/datocms';
import React from 'react';

export const ALL_PROJECTS_QUERY = `
query ALL_PROJECTS_QUERY($slug: String!) {
  allProjects(locale: en) {
    slug
  }
}
`;

export const PROJECT_QUERY = `
query PROJECT_QUERY{
  project(locale: en, filter: {slug: {eq: "$slug"}}) {
    projectAdds
    projectId
    projectImage {
      alt
      url
    }
    projectInfo
    projectTechnology
    projectTitle
    slug
  }
}
`;

const PostPage: React.FC<{ project: Project }> = ({ project }) => {
  console.log(project);
  return (
    <Layout title={title} description={subtitle}>
      <div>{project.projectTitle}</div>
      <div>{project.projectId}</div>
    </Layout>
  );
};
export default PostPage;

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const project = await getProject(params?.slug, locale);

  return {
    props: {
      project,
    },
  };
}

export async function getStaticPaths({ locales }: GetStaticPropsContext) {
  const allProjects = await getAllProjects();
  const pathsArray: { params: { slug: string }; locale: string }[] = [];
  allProjects?.map((project) => {
    locales?.map((language) => {
      pathsArray.push({ params: { slug: project.slug }, locale: language });
    });
  });

  return {
    paths: pathsArray,
    fallback: false,
  };
}
