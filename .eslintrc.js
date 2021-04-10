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
          _apis: './src/apis',
          _screens: './src/screens',
          _styles: './src/styles',
          _navigations: './src/navigations',
          _components: './src/components',
        },
      },
    },
  },
};
