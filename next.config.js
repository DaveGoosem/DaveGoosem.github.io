const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app www.googletagmanager.com/gtag/js;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/wildcard-pages-with-item-buckets-azure-search',
          destination: '/blog/wildcard-pages-with-item-buckets-azure-search',
          permanent: true,
        },
        {
          source: '/super-charge-your-seo-game-with-sitecore-and-google-structured-data',
          destination: '/blog/super-charge-your-seo-game-with-sitecore-and-google-structured-data',
          permanent: true,
        },
        {
          source: '/sitecore-with-solr-the-management-conundrum',
          destination: '/blog/sitecore-with-solr-the-management-conundrum',
          permanent: true,
        },
        {
          source: '/sitecore-with-helix-architecture-multisite',
          destination: '/blog/sitecore-with-helix-architecture-multisite',
          permanent: true,
        },
        {
          source: '/sitecore-wildcard-pages-with-item-buckets-jss',
          destination: '/blog/sitecore-wildcard-pages-with-item-buckets-jss',
          permanent: true,
        },
        {
          source: '/sitecore-sxa-and-theme',
          destination: '/blog/sitecore-sxa-and-theme',
          permanent: true,
        },
        {
          source: '/sitecore-send-first-impressions',
          destination: '/blog/sitecore-send-first-impressions',
          permanent: true,
        },
        {
          source: '/sitecore-on-azure-paas-file-i-o-errors',
          destination: '/blog/sitecore-on-azure-paas-file-i-o-errors',
          permanent: true,
        },
        {
          source: '/sitecore-jss-multi-site-with-npm-workspaces',
          destination: '/blog/sitecore-jss-multi-site-with-npm-workspaces',
          permanent: true,
        },
        {
          source: '/sitecore-helix-initial-thoughts',
          destination: '/blog/sitecore-helix-initial-thoughts',
          permanent: true,
        },
        {
          source: '/sitecore-headless-jss-static-site-generation-ssg',
          destination: '/blog/sitecore-headless-jss-static-site-generation-ssg',
          permanent: true,
        },
        {
          source: '/sitecore-custom-facets-returns-single-words',
          destination: '/blog/sitecore-custom-facets-returns-single-words',
          permanent: true,
        },
        {
          source: '/sitecore-cold-dr-on-a-budget',
          destination: '/blog/sitecore-cold-dr-on-a-budget',
          permanent: true,
        },
        {
          source: '/sitecore-10-3-mono-repo-setup-with-npm-workspaces-nextjs13',
          destination: '/blog/sitecore-10-3-mono-repo-setup-with-npm-workspaces-nextjs13',
          permanent: true,
        },
        {
          source: '/sitecore-8-2-devtools-test-your-queries',
          destination: '/blog/sitecore-8-2-devtools-test-your-queries',
          permanent: true,
        },
        {
          source: '/securing-a-saas-solution-with-edge-networks',
          destination: '/blog/securing-a-saas-solution-with-edge-networks',
          permanent: true,
        },
        {
          source: '/optimising-your-sitecore-site-for-accessibility',
          destination: '/blog/optimising-your-sitecore-site-for-accessibility',
          permanent: true,
        },
        {
          source: '/moving-from-aws-to-azure',
          destination: '/blog/moving-from-aws-to-azure',
          permanent: true,
        },
        {
          source: '/mentoring-new-sitecore-developers',
          destination: '/blog/mentoring-new-sitecore-developers',
          permanent: true,
        },
        {
          source: '/indexing-external-data-with-sitecore',
          destination: '/blog/indexing-external-data-with-sitecore',
          permanent: true,
        },
        {
          source: '/identifying-contacts-sitecore-cdp-send',
          destination: '/blog/identifying-contacts-sitecore-cdp-send',
          permanent: true,
        },
        {
          source: '/getting-rid-of-sitecore-config-transforms',
          destination: '/blog/getting-rid-of-sitecore-config-transforms',
          permanent: true,
        },
        {
          source: '/federated-search',
          destination: '/blog/federated-search',
          permanent: true,
        },
        {
          source: '/configuring-your-sitecore-heads-in-vercel-for-multi-site',
          destination: '/blog/configuring-your-sitecore-heads-in-vercel-for-multi-site',
          permanent: true,
        },
        {
          source: '/configuring-solr-for-sitecore',
          destination: '/blog/configuring-solr-for-sitecore',
          permanent: true,
        },
        {
          source: '/configuring-sitecore-jss-headless-nextjs-security-headers',
          destination: '/blog/configuring-sitecore-jss-headless-nextjs-security-headers',
          permanent: true,
        },
        {
          source: '/configuring-searchstax-for-your-sitecore-solution',
          destination: '/blog/configuring-searchstax-for-your-sitecore-solution',
          permanent: true,
        },
        {
          source: '/building-robots-txt-with-sitecore-jss-graphql',
          destination: '/blog/building-robots-txt-with-sitecore-jss-graphql',
          permanent: true,
        },
        {
          source: '/build-release-with-azure-paas',
          destination: '/blog/build-release-with-azure-paas',
          permanent: true,
        },
      ]
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  })
}
