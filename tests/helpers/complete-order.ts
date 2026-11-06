import { expect, type Page } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { PaymentPage } from '../../pages/payment-page';
import { SignupPage } from '../../pages/signup-page';
import { createOrderComment, createPaymentData } from '../data/test-data';
import type { SignupData } from './register-user';

export async function completeOrderAndCleanup(
  page: Page,
  signupData: SignupData,
): Promise<void> {
  const homePage = new HomePage(page);
  const paymentPage = new PaymentPage(page);
  const signupPage = new SignupPage(page);

  await expect(homePage.deliveryAddressHeading).toBeVisible();
  await expect(homePage.billingAddressHeading).toBeVisible();

  for (const address of [
    homePage.deliveryAddressDetails,
    homePage.billingAddressDetails,
  ]) {
    await expect(address).toContainText(signupData.name);
    await expect(address).toContainText(signupData.address);
    await expect(address).toContainText(signupData.city);
    await expect(address).toContainText(signupData.state);
    await expect(address).toContainText(signupData.zipCode);
    await expect(address).toContainText(signupData.country);
    await expect(address).toContainText(signupData.mobileNumber);
  }

  await expect(signupPage.totalAmount).toBeVisible();
  await homePage.orderCommentInput.fill(createOrderComment());
  await signupPage.placeOrderLink.click();

  const paymentData = createPaymentData();
  await paymentPage.nameOnCardInput.fill(paymentData.nameOnCard);
  await paymentPage.cardNumberInput.fill(paymentData.cardNumber);
  await paymentPage.cvcInput.fill(paymentData.cvc);
  await paymentPage.expiryMonthInput.fill(paymentData.expirationMonth);
  await paymentPage.expiryYearInput.fill(paymentData.expirationYear);
  await paymentPage.payAndConfirmOrderButton.click();
  await expect(signupPage.orderPlacedMessage).toBeVisible();

  await signupPage.continueButton.click();
  await signupPage.deleteAccountLink.click();
  await expect(signupPage.accountDeletedMessage).toBeVisible();
  await signupPage.continueButton.click();
}
