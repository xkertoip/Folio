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
        allProjects(orderBy: order_ASC) {
        introduction(locale: ${formattedLocale})
        slug
        id
        title
        order
        technology
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
const variantsWrapper = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  show: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
};
const variantsText = {
  hidden: (direction: number) => {
    return {
      y: direction >= 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 1,
      },
    };
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Projects: NextPageWithLayout = ({ subscription }: any) => {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [[transition, direction], setTransition] = useState([0, 0]);
  const [current, setCurrent] = useState(0);
  const { elementHeight } = useElementProperties({
    wrapperRef,
  });
  const currentIndex = range(0, allProjects.length, 0);

  const handlePosition = (newDirection: number) => {
    setTransition([transition + newDirection * elementHeight, newDirection]);
    setCurrent(current - newDirection);
    console.log(current);
  };

  return (
    <>
      <Wrapper>
        <Content>
          {allProjects?.map(
            ({
              id,
              image,
              title,
              introduction,
              technology,
              order,
            }: Project) => (
              <motion.div key={id}>
                <ProjectWrapper
                  ref={wrapperRef}
                  style={{
                    backgroundImage: `url(${image.responsiveImage.src})`,
                  }}
                  animate={{
                    y: transition,
                    transition: {
                      duration: 1,
                    },
                  }}
                />
                <ProjectContent
                  variants={variantsWrapper}
                  initial="hidden"
                  animate={current === order - 1 ? 'show' : 'hidden'}
                >
                  <ProjectNumber>
                    <ProjectTextMask>
                      <motion.h1 variants={variantsText} custom={direction}>
                        {order}
                      </motion.h1>
                    </ProjectTextMask>
                  </ProjectNumber>

                  <ProjectDescription>
                    <ProjectTextMask>
                      <ProjectTechnology
                        variants={variantsText}
                        custom={direction}
                      >
                        {technology}
                      </ProjectTechnology>
                    </ProjectTextMask>
                    <ProjectTextMask>
                      <ProjectTitle variants={variantsText} custom={direction}>
                        {title}
                      </ProjectTitle>
                    </ProjectTextMask>
                    <ProjectTextMask>
                      <motion.p variants={variantsText} custom={direction}>
                        {introduction} <span>Read More</span>
                      </motion.p>
                    </ProjectTextMask>
                  </ProjectDescription>
                </ProjectContent>
              </motion.div>
            )
          )}
        </Content>
        <ButtonContainer>
          <Button onClick={() => handlePosition(1)}>Prev</Button>
          <Button onClick={() => handlePosition(-1)}>Next</Button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactNode) {
  return (
    <ProjectsLayout title={title} description={subtitle}>
      {page}
    </ProjectsLayout>
  );
};
export default Projects;

const Wrapper = styled.div`
  overflow-y: hidden;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;
const ProjectTechnology = styled(motion.h2)`
  position: relative;
  display: flex;
  align-items: center;
  :before {
    content: '';
    width: 62px;
    height: 2px;
    margin-right: 1rem;
    background-color: var(--mainColor);
  }
`;

const ProjectWrapper = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
`;
const ProjectTextMask = styled.div`
  position: relative;
  overflow: hidden;
`;
const ProjectTitle = styled(motion.h1)``;

const ProjectContent = styled(motion.div)`
  width: 100%;
  position: absolute;
  margin-top: 4rem;
  margin-bottom: 7rem;
  display: flex;
  top: 4rem;
  z-index: 2;
`;
const ProjectNumber = styled.div`
  width: 50%;
`;
const ProjectDescription = styled.div`
  width: 50%;
`;
const ButtonContainer = styled.div`
  position: absolute;
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
    width: 65px;
    height: 65px;
  }
`;
