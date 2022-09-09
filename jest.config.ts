// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",
  verbose: true,
};

export default config;