import Link from 'next/link';
import ShadowImageWrapper from '../ShadowImageWrapper';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import { Project } from '../../lib/types';
import InfiniteLoop from '../InfiniteLoop';
import { useTranslation } from 'next-i18next';
import Perspective from '../Perspective';

type Props = {
  data: Project;
};
const button = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const wrapper = {
  show: {
    opacity: 0.4,
  },
  hidden: {
    opacity: 1,
  },
};
export default function WorkCard({ data }: Props) {
  const { t } = useTranslation('home');
  return (
    <div className={' max-w-[250px] m-auto'}>
      <ShadowImageWrapper>
        <Perspective>
          <Link href={'/projects/' + data.slug}>
            <a>
              <motion.div
                className={'relative '}
                whileHover={'show'}
                initial={'hidden'}
              >
                <motion.div
                  className={'min-w-full min-h-[200px] relative h-auto  z-[-1]'}
                  variants={wrapper}
                >
                  <Image
                    src={data.image.responsiveImage.src}
                    alt={'Piotr Szczypka'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </motion.div>
                <motion.div
                  variants={button}
                  className={
                    'absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-secondary w-[70px] h-[70px] rounded-full flex items-center justify-center z-[-1] drop-shadow-2xl'
                  }
                >
                  <h3 className={'text-primaryDark dark:text-primaryLight'}>
                    {t('view')}
                  </h3>
                </motion.div>
              </motion.div>
            </a>
          </Link>
        </Perspective>
      </ShadowImageWrapper>

      <div>
        <motion.h3
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
          }}
          className={'font-CaudexItalic text-2xl text-center'}
        >
          {data.title}
        </motion.h3>
        <h4 className={'flex  text-secondary'}>
          <InfiniteLoop>
            {data.technology.map((element) => (
              <span className={'mr-4 whitespace-nowrap'} key={element}>
                {element}
              </span>
            ))}
          </InfiniteLoop>
        </h4>
      </div>
    </div>
  );
}
