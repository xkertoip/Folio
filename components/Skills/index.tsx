import Indicator from '../Indicator';
import SectionTitle from '../SectionTitle';
import { useTranslation } from 'next-i18next';
import FrameworkPicker from '../FrameworkPicker';
import CardShadow from '../CardShadow';

function Skills({ ...props }) {
  const { t } = useTranslation('home');
  return (
    <div className={'pr-[10%] sm:pr-[20%] z-[8] -top-[60px] relative'}>
      <CardShadow>
        <SectionTitle align={'right'}>{t('skillsTitle')}</SectionTitle>

        <Indicator align={'left'}>
          N&#176;4
          <br />
          {t('skills')}
        </Indicator>
        <FrameworkPicker {...props} />
      </CardShadow>
    </div>
  );
}

export default Skills;
