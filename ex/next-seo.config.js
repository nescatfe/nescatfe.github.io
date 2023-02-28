// @ts-check

/**
 * @type {import('next-seo').NextSeoProps}
 */
const defaultSEOConfig = {
  defaultTitle: 'Coolskyz',
  titleTemplate: '%s | Coolskyz — Software Engineer and Community Manager',

  description:
    'A Full-stack Software Engineer and a community leader with a passion for building software that improves the lives of others.',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${process.env.SITE_URL ?? 'https://mybae.id'}/images/og.png`,
        alt: 'Coolskyz — Software Engineer and Community Manager'
      }
    ],
    url: process.env.SITE_URL ?? 'https://mybae.id',
    site_name: 'Christopher Angelo - Full-stack Developer'
  },

  twitter: {
    handle: '@fajar.wh',
    site: '@fajar.wh',
    cardType: 'summary_large_image'
  },

  additionalLinkTags: [
    {
      rel: 'icon',
      href: 'favicon.ico'
    }
  ],
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#d946ef'
    }
  ]
}

export default defaultSEOConfig
