import 'dotenv/config';

export type TestEnvironmentName = 'dev' | 'test';

const environments = {
  dev: {
    baseURL: 'https://automationexercise.com/',
    baseURLVariable: 'DEV_URL',
    passwordVariable: 'DEV_PASSWORD',
  },
  test: {
    baseURL: 'https://test.automationexercise.com/',
    baseURLVariable: 'TEST_URL',
    passwordVariable: 'TEST_PASSWORD',
  },
} as const;

const selectedEnvironment = process.env.TEST_ENV ?? 'dev';

if (selectedEnvironment !== 'dev' && selectedEnvironment !== 'test') {
  throw new Error(
    `Invalid TEST_ENV "${selectedEnvironment}". Choose "dev" or "test".`,
  );
}

const settings = environments[selectedEnvironment];
const baseURL = process.env[settings.baseURLVariable] || settings.baseURL;
const password = process.env[settings.passwordVariable];

if (!password) {
  throw new Error(`Set the ${settings.passwordVariable} environment variable.`);
}

export const environment = {
  name: selectedEnvironment,
  baseURL,
  password,
};
