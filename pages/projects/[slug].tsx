import Layout from '../../components/Layout';
const title = "Hello, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";
import { GetStaticPaths, GetStaticProps } from 'next';
import { request } from '../../lib/datocms';
import React from 'react';
import { useQuerySubscription } from 'react-datocms';
import { Project } from '../../lib/types';

export const getStaticPaths: GetStaticPaths = async (context) => {
  const data = await request({ query: `{ allProjects { slug } }` });
  const pathsArray: { params: { slug: string }; locale: string }[] = [];
  data.allProjects.map((project: Project) => {
    context.locales?.map((language) => {
      pathsArray.push({ params: { slug: project.slug }, locale: language });
    });
  });

  return {
    paths: pathsArray,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  locale,
  preview,
  params,
}) => {
  const formattedLocale = locale?.split('-')[0];
  const graphqlRequest = {
    query: `
query ProjectBySlug($slug: String) {
    project(filter: {slug: {eq: $slug}}, locale: ${formattedLocale}) {
    slug
    title
    technology
    introduction
    description
    adds
  }
}
`,
    preview,
    variables: {
      slug: params?.slug,
    },
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

const ProjectPage = ({ subscription, preview }: any) => {
  const {
    data: { project },
  } = useQuerySubscription(subscription);
  return (
    <Layout title={title} description={subtitle}>
      <div>{project.title}</div>
      <div>{project.description}</div>
      <div>{project.adds}</div>
      <div>{project.technology}</div>
    </Layout>
  );
};
export default ProjectPage;
