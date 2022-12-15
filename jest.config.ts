// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg | jpeg | png | gif | ico | svg | webp)$': '<rootDir>/mocks/fileMock.ts'
  }
};

export default config;

// "jest": {
//   "moduleNameMapper": {
//     "\\.(jpg | jpeg | png | gif | ico | svg | webp )$": "<rootDir>/mocks/fileMock.ts"
//   }
// }