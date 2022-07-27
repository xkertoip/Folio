import styled from 'styled-components';
import { useQuerySubscription } from 'react-datocms';
import Layout from '../components/Layout';
import { request } from '../lib/datocms';
import { Project } from '../lib/types';
import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import ProjectsLayout from '../components/Layout/projects';
import { NextPageWithLayout } from './_app';

import { device } from '../styles/mediaQuery';
import useElementProperties from '../utils/useElementProperties';
import { motion } from 'framer-motion';
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

export function range(initial: number, length: number, current: number) {
  let x;
  if (current > length - 1) {
    x = current % length;
    return x;
  } else if (current < initial) {
    if (length + (current % length) === length) {
      x = (current % length) * -1;
      return x;
    } else {
      x = length + (current % length);
      return x;
    }
  } else {
    x = current;
    return x;
  }
}

const variantsButton = {
  hidden: {
    x: '100%',
  },
  show: {
    x: 0,
  },
};

const Projects: NextPageWithLayout = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [transition, setTransition] = useState(0);
  const [current, setCurrent] = useState(0);
  const { elementHeight } = useElementProperties({
    wrapperRef,
  });
  const currentIndex = range(0, allProjects.length, 0);

  const handlePosition = (direction: number) => {
    setTransition(transition + direction * elementHeight);
    console.log(transition);
  };

  return (
    <>
      <Wrapper>
        <Content
          style={{
            y: transition,
          }}
        >
          {allProjects?.map(({ title, introduction, slug, image }: Project) => (
            <ProjectWrapper
              ref={wrapperRef}
              key={title}
              style={{
                backgroundImage: `url(${image.responsiveImage.src})`,
              }}
            >
              <Link href={`/projects/${slug}`}>{title}</Link>
              <div>{introduction}</div>
            </ProjectWrapper>
          ))}
        </Content>
      </Wrapper>
      <ButtonContainer>
        <Button onClick={() => handlePosition(1)}>Prev</Button>
        <Button onClick={() => handlePosition(-1)}>Next</Button>
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
  overflow-y: hidden;
  position: fixed;
  width: 100%;
`;
const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  transition-duration: 2s;
`;

const ProjectWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;
const Button = styled(motion.button)`
  width: 65px;
  height: 65px;
  font-size: 1rem;
  background-color: transparent;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  border-radius: 50%;
  border: 2px solid var(--mainColor);
  @media only screen and ${device.tablet} {
    width: 75px;
    height: 75px;
  }
`;
