import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';
import { motion } from 'framer-motion';
import React from 'react';
import { Project } from '../../lib/types';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  array: [];
};

const variantsImage = {
  hover: {
    scale: 1.2,
    opacity: 1,
  },
  leave: {
    scale: 1,
    opacity: 0.7,
  },
};

const variantsCircle = {
  hover: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: {
      duration: 0.3,
    },
  },
  leave: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: {
      duration: 0.3,
    },
  },
};

export default function Slider({ array }: Props) {
  return (
    <Wrapper>
      <List role="list">
        {array?.map((project: Project) => (
          <Slide key={project.id} whileHover="hover" initial="leave">
            <Link href={`/projects/${project.slug}`}>
              <ItemContent>
                <ImageContainer variants={variantsImage}>
                  <Image
                    src={project.image.responsiveImage.src}
                    alt="project preview"
                    objectFit="cover"
                    layout="fill"
                  />
                  <HiddenCircle variants={variantsCircle}>
                    <p>
                      VIEW <br /> PROJECT{' '}
                    </p>
                  </HiddenCircle>
                </ImageContainer>
              </ItemContent>
            </Link>
          </Slide>
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  overflow: scroll;
  overflow-y: hidden;
  display: flex;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const HiddenCircle = styled(motion.div)`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: var(--specialColor);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translate(-50%, -50%);
`;

const List = styled(motion.ul)`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  @media only screen and ${device.tablet} {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10%;
  }
`;

export const Slide = styled(motion.li)`
  position: relative;
  width: 292px;
  margin: 1rem;
  overflow: hidden;
  background-color: var(--background);
  border-top: 2px solid var(--specialColor);
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  @media only screen and ${device.tablet} {
    width: 23vw;
  }
`;
export const ItemContent = styled.a`
  /*  width: 70vw;
  @media only screen and ${device.tablet} {
    width: 300px;
  }*/
`;

export const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 40vh;
  position: relative;

  @media only screen and ${device.tablet} {
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
const Line = styled.div`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mainColor);
  position: relative;
`;
