module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _services: './src/services',
          _hooks: './src/hooks',
          _redux: './src/redux',
          _screens: './src/screens',
          _styles: './src/styles',
          _routes: './src/routes',
          _components: './src/components',
          _constants: './src/constants',
          redux: './node_modules/redux',
        },
      },
    },
  },
};
