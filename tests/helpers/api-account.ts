import { expect, type APIRequestContext } from '@playwright/test';
import { createSignupData } from '../data/test-data';
import type { SignupData } from './register-user';

export async function createAccountViaApi(
  request: APIRequestContext,
  password: string,
): Promise<SignupData> {
  const user = createSignupData();

  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password,
      title: user.gender.replace('.', ''),
      birth_date: user.day,
      birth_month: user.month,
      birth_year: user.year,
      firstname: user.firstName,
      lastname: user.lastName,
      company: '',
      address1: user.address,
      address2: '',
      country: user.country,
      zipcode: user.zipCode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });
  const body = await response.json();
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');

  return user;
}

export async function deleteAccountViaApi(
  request: APIRequestContext,
  email: string,
  password: string,
): Promise<void> {
  await request.delete('/api/deleteAccount', { form: { email, password } });
}
