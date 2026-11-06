import { faker } from '@faker-js/faker';

export const testData = {
  cartPath: '/view_cart',
  cartProducts: ['Blue Top', 'Men Tshirt'],
} as const;

const supportedCountries = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
] as const;

export function createSignupData() {
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    name: `${firstName} ${lastName}`,
    email: `automation-${faker.string.uuid()}@example.com`,
    gender: faker.helpers.arrayElement(['Mr.', 'Mrs.'] as const),
    day: String(birthDate.getDate()),
    month: String(birthDate.getMonth() + 1),
    year: String(birthDate.getFullYear()),
    firstName,
    lastName,
    address: faker.location.streetAddress(),
    country: faker.helpers.arrayElement(supportedCountries),
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    mobileNumber: faker.string.numeric(10),
  };
}

export function createPaymentData() {
  const expirationDate = faker.date.future({ years: 5 });

  return {
    nameOnCard: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber(),
    cvc: faker.finance.creditCardCVV(),
    expirationMonth: String(expirationDate.getMonth() + 1).padStart(2, '0'),
    expirationYear: String(expirationDate.getFullYear()),
  };
}

export function createOrderComment(): string {
  return faker.lorem.sentence();
}

export function createInvalidCredentials() {
  return {
    email: createSignupData().email, // UUID-based, so it can't match a real account
    password: faker.internet.password(),
  };
}
