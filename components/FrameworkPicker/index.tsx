import useRandomNumber from '../../utils/useRandomNumber';
import FrameworkSlider from '../FrameworkSlider';
import { motion } from 'framer-motion';
import FrameworkCard from '../FrameworkCard';
import { Framework } from '../../lib/types';
import { useCallback, useEffect, useState } from 'react';
import useFindEqual from '../../utils/useFindEqual';

interface Props {
  object: [key: Framework];
}
const FrameworkPicker = ({ ...props }) => {
  const date = Object.values(props);
  const { currentNumber, handleClick } = useRandomNumber({
    min: date[0].number,
    max: date.length,
  });
  const object = useFindEqual({ array: date, compare: currentNumber });
  /*  const [currentFramework, setCurrentFramework] = useState(date[0]);*/
  /*  const findFramework = useCallback(() => {
    const framework = date.find(({ number }) => number === currentNumber);
    if (framework) {
      setCurrentFramework(framework);
    }
  }, [date, currentNumber]);

  useEffect(() => {
    findFramework();
  }, [findFramework]);*/

  return (
    <div className={' md:flex sm:gap-8'}>
      <div
        className={
          'md:flex-1 w-full relative overflow-hidden min-h-[30vh] my-auto'
        }
      >
        <FrameworkSlider
          number={object.number}
          logo={object.logo.responsiveImage.src}
          name={object.name}
        />
      </div>
      <motion.div
        className={
          'flex md:flex-1  flex-wrap justify-center lg:justify-start flex-1 gap-2 z-2 relative py-4 relative '
        }
      >
        {date.map((element: Framework) => (
          <FrameworkCard
            key={element.number}
            handler={handleClick}
            currentNumber={currentNumber}
            framework={element}
          />
        ))}
      </motion.div>
    </div>
  );
};
export default FrameworkPicker;
