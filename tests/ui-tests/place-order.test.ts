import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { environment } from '../../config/environment';
import { completeOrderAndCleanup } from '../helpers/complete-order';
import { registerNewUser } from '../helpers/register-user';
import { testData } from '../data/test-data';
import { skipIfEnvironmentUnreachable } from '../helpers/environment-availability';

const [firstProduct, secondProduct] = testData.cartProducts;

test.describe('Place Order', () => {
  test.beforeEach(async ({ page, request }, testInfo) => {
    await skipIfEnvironmentUnreachable(request, testInfo);

    const homePage = new HomePage(page);
    //Checking if the website is down with Queue Full message
    for (let attempt = 1; attempt <= 3; attempt++) {
      await homePage.open();

      if (!(await homePage.queueFullMessage.isVisible())) {
        break;
      }

      if (attempt === 3) {
        throw new Error(
          `Environment failure: ${environment.name} at ${environment.baseURL} returned a queue-full page after 3 attempts.`,
        );
      }

      await page.waitForTimeout(attempt * 1_000);
    }
    await homePage.open();
    await expect(page).toHaveURL(environment.baseURL);
    await expect(homePage.websiteLogo).toBeVisible();
  });

  test('Test Case 14: Place Order - Register while Checkout', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    // Add products to the cart
    await homePage.addToCartButtonFor(firstProduct).click();
    await homePage.continueShoppingButton.click();
    await homePage.addToCartButtonFor(secondProduct).click();
    await homePage.viewCartLink.click();
    await expect(page).toHaveURL(
      new URL(testData.cartPath, environment.baseURL).href,
    );
    await expect(homePage.orderRowFor(firstProduct)).toBeVisible();
    await expect(homePage.orderRowFor(secondProduct)).toBeVisible();
    // Proceed to checkout
    await homePage.checkoutButton.click();
    await homePage.registerLoginLink.click();
    const signupData = await registerNewUser(page, environment.password);
    // Place the order and verify that the order is placed successfully
    await homePage.cartLink.click();
    await homePage.checkoutButton.click();
    await completeOrderAndCleanup(page, signupData);
  });

  test('Test Case 15: Place Order - Register before Checkout', async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    // Register before shopping
    await homePage.signupLoginLink.click();
    const signupData = await registerNewUser(page, environment.password);

    // Add products and proceed to checkout
    await homePage.addToCartButtonFor(firstProduct).click();
    await homePage.continueShoppingButton.click();
    await homePage.addToCartButtonFor(secondProduct).click();
    await homePage.viewCartLink.click();
    await expect(page).toHaveURL(
      new URL(testData.cartPath, environment.baseURL).href,
    );
    await expect(homePage.orderRowFor(firstProduct)).toBeVisible();
    await expect(homePage.orderRowFor(secondProduct)).toBeVisible();
    await homePage.checkoutButton.click();
    await completeOrderAndCleanup(page, signupData);
  });
});
