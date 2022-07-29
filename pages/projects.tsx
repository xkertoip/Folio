import styled from 'styled-components';
import { useQuerySubscription } from 'react-datocms';
import { request } from '../lib/datocms';
import { Project } from '../lib/types';
import React, { ReactNode, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import ProjectsLayout from '../components/Layout/projects';
import { NextPageWithLayout } from './_app';

import { device } from '../styles/mediaQuery';
import useElementProperties from '../utils/useElementProperties';
import { motion } from 'framer-motion';
const next = require('/images/next.svg');
const prev = require('/images/prev.svg');
import Image from 'next/image';
import useWindowDimensions from '../utils/useWindowDimensions';
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
const variantsButton = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const variantsWrapper = {
  hidden: {
    opacity: 0,
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
  const { windowHeight } = useWindowDimensions();
  const { elementHeight } = useElementProperties({
    wrapperRef,
  });

  const handleIncrease = () => {
    if (current < allProjects.length - 1) {
      setTransition([transition - elementHeight, -1]);
      setCurrent(current + 1);
    }
  };
  const handleDecrease = () => {
    if (current > 0) {
      setTransition([transition + elementHeight, 1]);
      setCurrent(current - 1);
    }
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
              <div key={id}>
                <ProjectWrapper
                  ref={wrapperRef}
                  style={{
                    backgroundImage: `url(${image.responsiveImage.src})`,
                    height: windowHeight,
                  }}
                  animate={{
                    y: transition,
                    transition: {
                      duration: 1,
                    },
                  }}
                />
                <ProjectContent
                  animate={current === order - 1 ? 'show' : 'hidden'}
                  variants={variantsWrapper}
                >
                  <div>
                    <ProjectTextMask style={{ display: 'flex' }}>
                      <h1>0</h1>
                      <motion.h1 variants={variantsText} custom={direction}>
                        {order}
                      </motion.h1>
                    </ProjectTextMask>
                  </div>

                  <div>
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
                  </div>
                </ProjectContent>
              </div>
            )
          )}
        </Content>
        <ButtonContainer>
          <Button
            variants={variantsButton}
            animate={current > 0 ? 'show' : 'hidden'}
            onClick={() => handleDecrease()}
          >
            <Image src={prev} alt="prev" />
          </Button>
          <Button
            variants={variantsButton}
            animate={current < allProjects.length - 1 ? 'show' : 'hidden'}
            onClick={() => handleIncrease()}
          >
            <Image src={next} alt="next" />
          </Button>
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
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  @media only screen and ${device.tablet} {
    min-height: 100vh;
  }
`;
const ProjectTextMask = styled.div`
  position: relative;
  overflow: hidden;
`;
const ProjectTitle = styled(motion.h1)`
  text-align: right;
  @media only screen and ${device.tablet} {
    text-align: left;
  }
`;

const ProjectContent = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  margin-bottom: 7rem;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding: 0 1rem;
  @media only screen and ${device.tablet} {
    flex-direction: row;
  }
`;
const ProjectNumber = styled.div`
  @media only screen and ${device.tablet} {
    width: 50%;
  }
`;
const ProjectDescription = styled.div`
  @media only screen and ${device.tablet} {
    width: 50%;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
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
