module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'dynamic-import-node',
    'lodash',
    'react-hot-loader/babel',
  ],
  ignore: ['node_modules'],
};
