module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
      '^~/(.*)$': '<rootDir>/$1',
      '^vue$': 'vue/dist/vue.common.js',
    },
}
