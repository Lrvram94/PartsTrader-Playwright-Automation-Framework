import type { Locator, Page } from '@playwright/test';

export class HomePage {
  takeScreenshot(arg0: string) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly page: Page) {}

  get websiteLogo(): Locator {
    return this.page.getByRole('img', { name: 'Website for automation practice' });
  }

  get loggedInAsUser(): Locator {
    return this.page.getByRole('banner').getByText(/Logged in as/);
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  addToCartButtonFor(productName: string): Locator {
  const productCard = this.page
    .locator('.product-image-wrapper')
    .filter({
      has: this.page.getByText(productName, { exact: true }),
    })
    .first();

  return productCard.locator('.productinfo .add-to-cart');
}
  get continueShoppingButton(): Locator {
    return this.page.locator('.btn.btn-success.close-modal.btn-block');
  }

  get viewCartLink(): Locator {
    return this.page.locator(`u:has-text("View Cart")`);
  }

  get cartLink(): Locator {
    return this.page.getByRole('link', { name: 'Cart' });
  }

  get checkoutButton(): Locator {
    return this.page.locator('.btn.btn-default.check_out');
  }

  get registerLoginLink(): Locator {
    return this.page.getByText('Register / Login', { exact: true }).first();
  }

  get signupLoginLink(): Locator {
    return this.page.getByRole('link', { name: /Signup \/ Login/ });
  }

  get deliveryAddressHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Your delivery address', level: 3 });
  }

  get deliveryAddressDetails(): Locator {
    return this.page.locator('#address_delivery');
  }

  get billingAddressHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Your billing address', level: 3 });
  }

  get billingAddressDetails(): Locator {
    return this.page.locator('#address_invoice');
  }

  get orderCommentInput(): Locator {
    return this.page.locator('[name="message"]');
  }

  orderRowFor(productName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: productName });
  }
}