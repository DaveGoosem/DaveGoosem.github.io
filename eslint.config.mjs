import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Global ignores (all file types)
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

  // Base JS rules
  js.configs.recommended,

  // Base TS rules (non-type-checked)
  ...tseslint.configs.recommended,

  // JS/JSX/MJS/CJS: keep default parser, add plugins/rules
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react: reactPlugin, 'jsx-a11y': jsxA11y, prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        { components: ['Link'], aspects: ['invalidHref', 'preferButton'] },
      ],
    },
  },

  // TS/TSX: use TS parser with project service
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
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
