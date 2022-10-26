import Indicator from '../Indicator';
import SectionTitle from '../SectionTitle';
import React from 'react';
import { Project } from '../../lib/types';
import { useTranslation } from 'next-i18next';
import WorkCard from '../WorkCard';
import CardShadow from '../CardShadow';
interface Props {
  projects: [key: Project];
}

function Work({ projects }: Props) {
  const { t } = useTranslation('home');
  return (
    <div className={'pl-[10%] sm:pl-[20%] z-[7] -top-[90px] relative'}>
      <CardShadow>
        <div className={'pb-8'}>
          <SectionTitle>{t('example')}</SectionTitle>
          <Indicator align={'text-right'}>
            N&#176;5
            <br />
            {t('project')}
          </Indicator>
        </div>

        <div className={'md:flex md:flex-wrap md:gap-8'}>
          {projects.map((project) => (
            <WorkCard key={project.title} data={project} />
          ))}
        </div>
      </CardShadow>
    </div>
  );
}

export default Work;
