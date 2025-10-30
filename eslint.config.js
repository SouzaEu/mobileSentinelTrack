const reactPlugin = require('eslint-plugin-react');

module.exports = [
  {
    ignores: ['node_modules/', 'android/', 'ios/', '.expo/', 'dist/', 'build/'],
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        React: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // General
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^React$',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'off', // Permitir Alert em React Native
      'prefer-const': 'error',
      'no-var': 'error',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',

      // Disable some rules that might conflict
      'comma-dangle': 'off',
      quotes: 'off',
      semi: 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
