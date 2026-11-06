import { expect, type Page } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { SignupPage } from '../../pages/signup-page';
import { createSignupData } from '../data/test-data';

export type SignupData = ReturnType<typeof createSignupData>;

export async function registerNewUser(
  page: Page,
  password: string,
): Promise<SignupData> {
  const homePage = new HomePage(page);
  const signupPage = new SignupPage(page);
  const signupData = createSignupData();

  await signupPage.signupNameInput.fill(signupData.name);
  await signupPage.signupEmailInput.fill(signupData.email);
  await signupPage.signupButton.click();

  await signupPage.genderRadio(signupData.gender).click();
  await signupPage.passwordInput.fill(password);
  await signupPage.daysDropdown.selectOption(signupData.day);
  await signupPage.monthsDropdown.selectOption(signupData.month);
  await signupPage.yearsDropdown.selectOption(signupData.year);
  await signupPage.firstNameInput.fill(signupData.firstName);
  await signupPage.lastNameInput.fill(signupData.lastName);
  await signupPage.addressInput.fill(signupData.address);
  await signupPage.countryInput.selectOption(signupData.country);
  await signupPage.stateInput.fill(signupData.state);
  await signupPage.cityInput.fill(signupData.city);
  await signupPage.zipcodeInput.fill(signupData.zipCode);
  await signupPage.mobileNumberInput.fill(signupData.mobileNumber);
  await signupPage.createAccountButton.click();

  await expect(signupPage.accountCreatedMessage).toBeVisible();
  await signupPage.continueButton.click();
  await expect(homePage.loggedInAsUser).toContainText(signupData.name);

  return signupData;
}
