/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withImages = require('next/image');
const nextConfig = {
  reactStrictMode: false,
  i18n,
  withImages,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/source',
      use: {
        loader: 'file-loader',
        options: {
          name: '/public/CV21.pdf',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
