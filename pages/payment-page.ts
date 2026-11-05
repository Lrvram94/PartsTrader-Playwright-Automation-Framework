import type { Locator, Page } from '@playwright/test';

export class PaymentPage {
  constructor(private readonly page: Page) {}

  get nameOnCardInput(): Locator {
    return this.page.locator('[data-qa="name-on-card"]');
  }

  get cardNumberInput(): Locator {
    return this.page.locator('[data-qa="card-number"]');
  }

  get cvcInput(): Locator {
    return this.page.locator('[data-qa="cvc"]');
  }

  get expiryMonthInput(): Locator {
    return this.page.locator('[data-qa="expiry-month"]');
  }

  get expiryYearInput(): Locator {
    return this.page.locator('[data-qa="expiry-year"]');
  }

  get payAndConfirmOrderButton(): Locator {
    return this.page.locator('[data-qa="pay-button"]');
  }
}