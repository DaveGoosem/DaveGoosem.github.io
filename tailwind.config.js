// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.600'),
              fontWeight: '500',
              textDecorationLine: 'underline',
              textDecorationColor: `${theme('colors.primary.500')}4d`,
              textUnderlineOffset: '3px',
              transition: 'text-decoration-color 150ms',
              '&:hover': {
                color: `${theme('colors.primary.500')}`,
                textDecorationColor: theme('colors.primary.500'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            'h2,h3,h4': {
              scrollMarginTop: theme('spacing.8'),
            },
            // Inline code as a subtle chip rather than `backticked` text
            ':not(pre) > code': {
              color: theme('colors.indigo.600'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              padding: '0.15em 0.4em',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              borderRadius: theme('borderRadius.xl'),
              border: `1px solid ${theme('colors.gray.800')}`,
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: theme('colors.primary.500'),
              backgroundColor: theme('colors.gray.50'),
              borderTopRightRadius: theme('borderRadius.lg'),
              borderBottomRightRadius: theme('borderRadius.lg'),
              padding: '0.25em 1.25em',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            img: {
              borderRadius: theme('borderRadius.xl'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.400'),
              textDecorationColor: `${theme('colors.primary.400')}4d`,
              '&:hover': {
                color: `${theme('colors.primary.300')}`,
                textDecorationColor: theme('colors.primary.300'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            ':not(pre) > code': {
              color: theme('colors.indigo.300'),
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
