// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

import type { Config } from 'jest';
import 'identity-obj-proxy';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  moduleNameMapper: {
    // '\\.(jpg | jpeg | png | gif | ico | svg | webp)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|ico|svg|webp)$': '<rootDir>/fileTransformer.ts',
    '\\.(css)$': 'identity-obj-proxy'
  },
  automock: false,
  setupFiles: ['./setUpJest.ts'],
};

export default config;

// "jest": {
//   "moduleNameMapper": {
//     "\\.(jpg | jpeg | png | gif | ico | svg | webp )$": "<rootDir>/mocks/fileMock.ts"
//   }
// }