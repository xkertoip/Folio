import {
  GetServerSideProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';
import Hero from '../components/Hero';
import { requestData } from '../lib/datocms';

import { SharedLayout } from '../components/Layout';
import Introduce from '../components/Introduce';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Work from '../components/Work';
import Summary from '../components/Summary';

const title = "Greetings, I'm Piotr 👋";
const subtitle = "I'm a frontend developer from Poland";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  console.log(props.date);

  return (
    <>
      <h3>{props.date}</h3>
      <SharedLayout title={title} description={subtitle}>
        <section>
          <Hero />
        </section>
        <section>
          <Introduce />
        </section>
        <section>{/*        <Experience {...allWorkplaces} />*/}</section>
        {/*      <section>
        <Skills {...allFrameworks} />
      </section>
      <section>
        <Work projects={allProjects} />
      </section>*/}
        <section>{/*        <Summary />*/}</section>
      </SharedLayout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const superNowaData = 'tajny string';
  return {
    props: {
      date: superNowaData,
    },
  };
};
/*  const subscription: QueryListenerOptions<any, any> = preview
    ? {
        initialData: await request(query),
        token: process.env.NEXT_DATOCMS_API_TOKEN,
      }
    : {
        enabled: false,
        initialData: await request(query),
      };
  return {
    props: {
      subscription,
    },
  };*/

/*        <div className={'absolute bottom-0 left-0  w-full '}>
            <ParallaxWithoutSSR array={firstArray} />
            <ParallaxWithoutSSR array={secondArray} reverse />
            <ParallaxWithoutSSR array={thirdArray} />
          </div>*/

/*  const firstArray = ['JavaScript', 'React', 'Next'];
const secondArray = ['Gatsby', 'Wordpress', 'TailwindCSS'];
const thirdArray = ['TailwindCSS', 'React', 'JavaScript'];*/

/*      <motion.video
            muted
            loop
            autoPlay
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0.4 }}
            transition={{ duration: 2, ease: 'easeIn' }}
            className={
              'absolute top-[10%] left-0 right-0 mx-auto w-full bg-active -z-[1] max-w-[700px] '
            }
          >
            <source src={'/videoBg.mp4'} type={'video/mp4'} />
          </motion.video>*/
