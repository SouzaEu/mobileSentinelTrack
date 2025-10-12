module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'prettier',
  ],
  plugins: [
    'react',
    'react-native',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    // Prettier
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'es5',
      tabWidth: 2,
      semi: true,
      printWidth: 80,
      bracketSpacing: true,
      arrowParens: 'avoid',
    }],
    
    // React/React Native
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-unused-state': 'error',
    'react/prefer-const': 'error',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    
    // General
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Import/Export
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    
    // Disable some rules that conflict with Prettier
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'quotes': 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'react/jsx-filename-extension': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    '.expo/',
    'dist/',
    'build/',
  ],
};
