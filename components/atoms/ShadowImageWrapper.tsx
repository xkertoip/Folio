import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';

type Props = {
  src: string;
  alt: string;
};
function ShadowImageWrapper({ src, alt }: Props) {
  return (
    <motion.div className={'opacity-90 drop-shadow-lg w-full h-full relative '}>
      <Image src={src} alt={alt} layout={'fill'} objectFit={'cover'} />
    </motion.div>
  );
}

export default ShadowImageWrapper;
