import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import * as mdx from 'eslint-plugin-mdx'

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.contentlayer/**',
      '.yarn/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '**/*.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // JS/JSX/MJS/CJS
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { react: reactPlugin, 'jsx-a11y': jsxA11y, prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'jsx-a11y/anchor-is-valid': [
        'error',
        { components: ['Link'], aspects: ['invalidHref', 'preferButton'] },
      ],
    },
  },

  // TS/TSX
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react: reactPlugin, 'jsx-a11y': jsxA11y, prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        { components: ['Link'], aspects: ['invalidHref', 'preferButton'] },
      ],
    },
  },

  // Use eslint-plugin-mdx flat config
  mdx.configs.flat,

  // Project-specific MDX rules
  {
    files: ['**/*.mdx'],
    plugins: { mdx, 'jsx-a11y': jsxA11y, react: reactPlugin, prettier: prettierPlugin },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'jsx-a11y/anchor-is-valid': [
        'error',
        { components: ['a', 'Link'], aspects: ['invalidHref', 'preferButton'] },
      ],
    },
  },

  // Prettier compatibility
  { name: 'prettier-config', rules: { ...prettierConfig.rules } },

  // Overrides for CommonJS config files
  {
    files: [
      'next.config.js',
      'next.config.cjs',
      'tailwind.config.js',
      'tailwind.config.cjs',
      '**/*.config.js',
      '**/*.config.cjs',
      '**/scripts/**/*.js',
    ],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]
