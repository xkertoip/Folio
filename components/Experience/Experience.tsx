import Indicator from '../Indicator';
import SectionTitle from '../SectionTitle';
import ExperienceCard from '../ExperienceCard';
import { Workplace } from '../../lib/types';
import { useTranslation } from 'next-i18next';
import CardShadow from '../CardShadow';

const Experience = ({ ...props }) => {
  const { t } = useTranslation('home');
  const { newDate } = props;
  console.log(newDate);
  const date = Object.values(props);
  return (
    <div className={'pl-[10%] sm:pl-[20%] z-[9] -top-[30px] relative'}>
      <CardShadow>
        <SectionTitle>{t('workplace')}</SectionTitle>

        <Indicator align={'right'}>
          N&#176;3
          <br />
          {t('experience')}
        </Indicator>

        <div
          className={
            'pt-8 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory  md:overflow-x-hidden md:w-full justify-between '
          }
        >
          {date.map((element: Workplace) => (
            <ExperienceCard key={element.job} data={element} />
          ))}
        </div>
      </CardShadow>
    </div>
  );
};

export default Experience;
