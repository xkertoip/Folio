/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withImages = require('next/image');
const nextConfig = {
  reactStrictMode: false,
  i18n,
  withImages,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      type: 'asset/source',
    });

    return config;
  },
};

module.exports = nextConfig;
