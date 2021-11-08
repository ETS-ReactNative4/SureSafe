module.exports = api => {
  api.cache(true);

  const modules = [
    'services',
    'assets',
    'hooks',
    'components',
    'constants',
    'screens',
    'redux',
    'routes',
    'styles',
    'utils',
  ];

  const alias = modules.reduce(
    (aliasAcc, moduleName) => {
      aliasAcc[`_${moduleName}`] = `./src/${moduleName}`;
      return aliasAcc;
    },
    {
      // explicitly add redux to avoid conflict with local redux folder's package.json
      redux: './node_modules/redux',
    },
  );

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias,
        },
      ],
    ],
  };
};
