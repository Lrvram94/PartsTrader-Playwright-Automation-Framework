import 'dotenv/config';

export type TestEnvironmentName = 'dev' | 'test';

const environments = {
  dev: {
    baseURL: 'https://automationexercise.com/',
    passwordVariable: 'DEV_PASSWORD',
  },
  test: {
    baseURL: 'https://test.automationexercise.com/',
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
const password = process.env[settings.passwordVariable];

if (!password) {
  throw new Error(`Set the ${settings.passwordVariable} environment variable.`);
}

export const environment = {
  name: selectedEnvironment,
  baseURL: settings.baseURL,
  password,
};