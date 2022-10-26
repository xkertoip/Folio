import { motion } from 'framer-motion';
import Image from 'next/image';
import { Framework } from '../../lib/types';
type Props = {
  framework: Framework;
  handler: (value: number) => void;
  currentNumber: number;
};
const flipVariants = {
  flip: {
    rotateY: 180,
    transition: {
      duration: 1,
    },
  },
  neutral: {
    rotateY: 0,
    transition: {
      duration: 1,
    },
  },
};

function FrameworkCard({ framework, handler, currentNumber }: Props) {
  return (
    <div
      className={` min-w-[64px] min-h-[64px] md:min-w-[86px] md:min-h-[86px]  border border-secondary dark:border-active  sm:hover:border-primaryDark sm:dark:hover:border-secondary duration-700 perspective-3d ${
        currentNumber === framework.number
          ? 'border-primaryDark dark:border-primaryLight'
          : 'border-secondary'
      }`}
      onClick={() => handler(framework.number)}
    >
      <motion.div
        variants={flipVariants}
        animate={currentNumber === framework.number ? 'flip' : 'neutral'}
        className={'relative w-full h-full transform-preserve '}
      >
        <div
          className={
            'absolute top-0 left-0 w-full h-full backface-hidden flex items-center justify-center'
          }
        >
          <div className={'relative w-full h-full max-w-[42px] max-h-[42px]'}>
            <Image
              src={framework.logo.responsiveImage.src}
              alt={'Piotr Szczypka'}
              layout={'fill'}
              objectFit={'contain'}
            />
          </div>
        </div>
        <div
          className={
            'absolute top-0 left-0 w-full h-full  backface-hidden  rotate-y-180 flex items-center justify-center'
          }
        >
          <h3 className={'font-CaudexItalic relative text-xs md:text-base'}>
            {framework.name}
          </h3>
        </div>
      </motion.div>
    </div>
  );
}

export default FrameworkCard;
