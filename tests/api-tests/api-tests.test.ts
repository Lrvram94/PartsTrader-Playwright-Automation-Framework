import { test } from '@playwright/test';
import { environment } from '../../config/environment';
import {
  createAccountViaApi,
  deleteAccountViaApi,
} from '../helpers/api-account';
import { createInvalidCredentials } from '../data/test-data';

test('API 7: verifyLogin with valid details', async ({ request }) => {
  const user = await createAccountViaApi(request, environment.password);

  try {
    const response = await request.post('/api/verifyLogin', {
      form: { email: user.email, password: environment.password },
    });

    const body = await response.json();
    test.expect(body.responseCode).toBe(200);
    test.expect(body.message).toBe('User exists!');
  } finally {
    await deleteAccountViaApi(request, user.email, environment.password);
  }
});

test('API 8: verifyLogin without email parameter', async ({ request }) => {
  const response = await request.post(
    `${environment.baseURL}/api/verifyLogin`,
    {
      form: { password: environment.password }, // no email on purpose
    },
  );

  const body = await response.json();
  test.expect(body.responseCode).toBe(400);
  test
    .expect(body.message)
    .toBe(
      'Bad request, email or password parameter is missing in POST request.',
    );
});

test('API 9: Delete to Verify Login', async ({ request }) => {
  const response = await request.delete(
    `${environment.baseURL}/api/verifyLogin`,
    {
      // no parameters provided on purpose
    },
  );

  const body = await response.json();
  test.expect(body.responseCode).toBe(405);
  test.expect(body.message).toBe('This request method is not supported.');
});

test('API 10: POST To Verify Login with invalid details', async ({
  request,
}) => {
  const response = await request.post('/api/verifyLogin', {
    form: createInvalidCredentials(),
  });

  const body = await response.json();
  test.expect(body.responseCode).toBe(404);
  test.expect(body.message).toBe('User not found!');
});
