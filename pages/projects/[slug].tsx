const title = "Greetings, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { request } from '../../lib/datocms';
import React, { ReactElement } from 'react';
import { useQuerySubscription } from 'react-datocms';
import { Project } from '../../lib/types';
import Image from 'next/image';
import ProjectLayout from '../../components/Layout/project';
import { motion } from 'framer-motion';

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
   image {
      responsiveImage {
        src
      }
    }
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

const ProjectPage: NextPage = ({ subscription }: any) => {
  const {
    data: { project },
  } = useQuerySubscription(subscription);
  return (
    <>
      <div>{project.title}</div>
      <div>{project.description}</div>
      <div>{project.adds}</div>
      <div>{project.technology}</div>
      <div>
        <motion.figure layoutId={`image-${project.id}`}>
          <Image
            src={project.image.responsiveImage.src}
            alt={'porjectImage'}
            layout={'responsive'}
            width={400}
            height={280}
          />
        </motion.figure>
      </div>
    </>
  );
};
/*
const OpacityWrapper = styled.div`
  opacity: 0.9;
  position: relative;
`;
const Shadow = styled.div`
  margin-bottom: 1rem;

  span {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
`;
*/

/*ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProjectLayout title={title} description={subtitle}>
      {page}
    </ProjectLayout>
  );
};*/
export default ProjectPage;
