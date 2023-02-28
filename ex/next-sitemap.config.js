module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mybae.id',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
}
