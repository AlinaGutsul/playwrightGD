export class FirstTimeLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.onboardingWindow = page.locator('div[data-test="user-onboarding-dialog-title"]');
    this.nextButton = page.locator('[data-test=user-onboarding-next]');
    this.bankNameField = page.locator('#bankaccount-bankName-input');
    this.routingNumberField = page.locator('#bankaccount-routingNumber-input');
    this.accountNumberField = page.locator('#bankaccount-accountNumber-input');
    this.saveButton = page.locator('[type=submit]');
    this.doneButton = page.locator('[data-test=user-onboarding-next]');
  }

  /**
   * @param {object} bankAccountDetails
   */
  async setupYourBankAccountWhenFirstLogin(bankAccountDetails) {
    await this.nextButton.click();
    await this.bankNameField.fill(bankAccountDetails.bankName);
    await this.routingNumberField.fill(bankAccountDetails.routingNumber);
    await this.accountNumberField.fill(bankAccountDetails.accountNumber);
    await this.saveButton.click();
    await this.doneButton.click();
  }
}
