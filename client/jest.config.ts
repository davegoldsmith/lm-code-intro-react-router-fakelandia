import type {Config} from 'jest';

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: [
    "./src/setupTests.ts"
  ],
  testEnvironment: "jsdom"
};

export default config;

