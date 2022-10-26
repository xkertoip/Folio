import Image from 'next/image';
import { Workplace } from '../../../lib/types';
import { motion } from 'framer-motion';
type Props = {
  data: Workplace;
};

function ExperienceCard({ data }: Props) {
  return (
    <motion.article
      className={
        ' snap-center flex-shrink-0 md:shrink overflow-hidden text-primaryDark dark:text-primaryLight w-[100%] px-4  max-w-[250px]  flex flex-col  space-y-4 pb-4'
      }
    >
      <div
        className={
          ' drop-shadow-xl grow border border-secondary dark:border-active  hover:border-active dark:hover:border-secondary duration-700 p-4'
        }
      >
        <div className={'space-y-4'}>
          <div
            className={
              'relative max-w-[200px] min-h-[80px] max-h-[80px] m-auto w-full'
            }
          >
            <Image
              src={data.logo.responsiveImage.src}
              alt={'Piotr Szczypka'}
              layout={'fill'}
              objectFit={'contain'}
            />
          </div>

          <h3 className={'text-right'}>{data.time}</h3>

          <p>{data.description}</p>
        </div>
      </div>
      <div className={'flex items-end'}>
        <h2 className={'text-center  text-xl justify-self-center mx-auto'}>
          {data.job}
        </h2>
      </div>
    </motion.article>
  );
}

export default ExperienceCard;
