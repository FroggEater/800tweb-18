const path = require('path')

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '.'),
    'shared',
    path.join(__dirname, 'test')
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
  },
}
