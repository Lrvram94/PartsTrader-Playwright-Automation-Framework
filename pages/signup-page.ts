import type { Locator, Page } from '@playwright/test';

export class SignupPage {
  constructor(private readonly page: Page) {}

  get signupNameInput(): Locator {
    return this.page.locator('[data-qa="signup-name"]');
  }

  get signupEmailInput(): Locator {
    return this.page.locator('[data-qa="signup-email"]');
  }

  get signupButton(): Locator {
    return this.page.getByRole('button', { name: 'Signup' });
  }

  genderRadio(title: 'Mr.' | 'Mrs.'): Locator {
    return this.page.getByRole('radio', { name: title, checked: false });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password *' });
  }

  get daysDropdown(): Locator {
    return this.page.locator('#days');
  }

  get monthsDropdown(): Locator {
    return this.page.locator('#months');
  }

  get yearsDropdown(): Locator {
    return this.page.locator('#years');
  }

  get firstNameInput(): Locator {
    return this.page.locator('#first_name');
  }

  get lastNameInput(): Locator {
    return this.page.locator('#last_name');
  }

  get addressInput(): Locator {
    return this.page.locator('#address1');  
  } 

  get countryInput(): Locator {
    return this.page.locator('#country');
  }

  get stateInput(): Locator {
    return this.page.locator('#state');
  }

  get cityInput(): Locator {
    return this.page.locator('#city');
  }

  get zipcodeInput(): Locator {
    return this.page.locator('#zipcode');
  }

  get mobileNumberInput(): Locator {
    return this.page.locator('#mobile_number');
  }

  get createAccountButton(): Locator {
    return this.page.locator('[data-qa="create-account"]');
  }

  get accountCreatedMessage(): Locator {
    return this.page.locator(`b:has-text("Account Created!")`);
  }

  get continueButton(): Locator {
    return this.page.locator('[data-qa="continue-button"]');
  }

  get totalAmount(): Locator {
    return this.page.getByText('Total Amount', { exact: true }).first();
  }

  get placeOrderLink(): Locator {
    return this.page.getByRole('link', { name: 'Place Order' });
  }

  get orderPlacedMessage(): Locator {
    return this.page.getByText(
      /^(?:Your order has been placed successfully!|Congratulations! Your order has been confirmed!)$/,
    );
  }

  get deleteAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Delete Account' });
  }

  get accountDeletedMessage(): Locator {
    return this.page.getByText('Account Deleted!', { exact: true }).first();
  }
}