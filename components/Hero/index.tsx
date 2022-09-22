import ShadowImageWrapper from '../atoms/ShadowImageWrapper';
const mainView2 = require('/images/mainView1.jpeg');
const mainView1 = require('/images/home_background.jpg');
import { motion } from 'framer-motion';
import Indicator from '../Headings/Indicator';
import Link from 'next/link';

const variants = {
  hover: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    width: 144,
    height: 144,
  },
};

function Hero() {
  return (
    <div className={'relative px-4'}>
      <Indicator>N&#176;1 Hello</Indicator>
      <h1
        className={
          'text-5xl uppercase text-gray-500 tracking-[10px] font-BebasNeue text-right'
        }
      >
        Piotr <br /> Szczypka
      </h1>
      <Link href={'/about'}>
        <a>
          <h2
            className={`text-basic text-right py-8 relative before:content-['About me']`}
          >
            About me
          </h2>
        </a>
      </Link>
      <div
        className={
          'w-[200px] bg-secondary h-[200px] relative rounded-full overflow-hidden '
        }
      >
        <ShadowImageWrapper src={mainView2} alt={'piotrek'} />
      </div>

      <div
        className={
          'w-full absolute top-[30%] h-[400px] left-0 bg-active -skew-y-12 text-[15vw] opacity-30 animate-pulse flex justify-center items-center'
        }
      ></div>
      <div>
        <p>scroll down</p>
      </div>

      {/*   <div className={'max-w-[200px] top-[-30px] relative'}>
        <ShadowImageWrapper src={mainView1} alt={'piotrek'} />
      </div>*/}
    </div>
  );
}

export default Hero;
