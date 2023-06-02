/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.{spec,test}.ts'],
  coverageDirectory: 'coverage',
  resetMocks: true,
  clearMocks: true,
  setupFilesAfterEnv: ['./mock.ts'],
};
