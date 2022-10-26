import { motion } from 'framer-motion';
import React from 'react';
import SocialMedia from '../SocialMedia';

export default function Footer() {
  return (
    <footer>
      <div className={'px-4 pb-16'}>
        <motion.div
          className={
            'p-4 border-t border-primaryDark dark:border-primaryLight flex justify-start gap-4'
          }
          initial={'show'}
        >
          <SocialMedia />
        </motion.div>

        <div
          className={'py-4 text-right text-primaryDark dark:text-primaryLight'}
        >
          <span>© 2022 - All rights reserved </span>
          <br />
          <span>Made by Piotr Szczypka</span>
        </div>
      </div>
    </footer>
  );
}
