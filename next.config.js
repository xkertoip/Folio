/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withImages = require('next/image');
const nextConfig = {
  reactStrictMode: false,
  i18n,
  withImages,
};

module.exports = nextConfig;
