/** @type {import('next-sitemap').IConfig} */

module.exports = {
  /* siteUrl: process.env.SITE_URL */
  siteUrl: 'https://example.com',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://piotr,szczypka.com',
      hreflang: 'en',
    },
    {
      href: 'https://pl.piotr,szczypka.com',
      hreflang: 'pl',
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/additional-page'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'test-bot',
        allow: ['/about', '/projects'],
      },
    ],
    additionalSitemaps: [
      'https://piotr.szczypka.com/my-custom-sitemap-1.xml',
      'https://piotr.szczypka.com/my-custom-sitemap-2.xml',
      'https://piotr.szczypka.com/my-custom-sitemap-3.xml',
    ],
  },
};
