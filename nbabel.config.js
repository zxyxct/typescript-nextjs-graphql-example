module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' }, useBuiltIns: 'entry' },
    ],
    '@babel/preset-typescript',
    'next/babel',
  ],
};
