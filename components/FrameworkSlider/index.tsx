import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  number?: number;
  logo: string;
  name: string;
};

const variants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: '-100%',
    opacity: 0,
  },
};

export default function FrameworkSlider({ number, name, logo }: Props) {
  return (
    <div className={'relative min-h-[40vh] grid gap-4 '}>
      <div className={'relative min-h-[130px]'}>
        <AnimatePresence>
          <motion.div
            key={number}
            className={
              'absolute  w-full h-full flex justify-center items-center'
            }
            variants={variants}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            transition={{
              duration: 1,
            }}
          >
            <div className={'relative min-w-[120px] min-h-[120px]  my-auto'}>
              <Image
                src={logo}
                alt={'framework'}
                layout={'fill'}
                objectFit={'contain'}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={'relative'}>
        <AnimatePresence>
          <motion.div
            key={name}
            className={'absolute h-full w-full'}
            variants={variants}
            initial={'exit'}
            animate={'animate'}
            exit={'initial'}
            transition={{
              duration: 1,
            }}
          >
            <h2
              className={
                'text-center text-2xl text-secondary font-CaudexItalic'
              }
            >
              {name}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
