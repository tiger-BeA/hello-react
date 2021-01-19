const { mkdReactConfig } = require('@monkey-design/eslint-config-mkd-react');

const config = mkdReactConfig({});

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['*.tsx'],
      rules: {
        'react/sort-comp': [0],
        'jsx-a11y/click-events-have-key-events': [0],
      },
    },
  ],
};
