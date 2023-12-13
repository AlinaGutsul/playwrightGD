export class BankAccountsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.createButton = page.locator('[data-test=bankaccount-new]');
    this.deleteButton = page.locator('[data-test=bankaccount-delete]');
    this.nextButton = page.locator('[data-test=user-onboarding-next]');
    this.bankNameField = page.locator('#bankaccount-bankName-input');
    this.routingNumberField = page.locator('#bankaccount-routingNumber-input');
    this.accountNumberField = page.locator('#bankaccount-accountNumber-input');
    this.saveButton = page.locator('[data-test=bankaccount-submit]');
    this.bankAccountsList = page.locator('[data-test=bankaccount-list]');
    this.arrayOfExistingBankAccounts = page.locator('li[data-test*=bankaccount-list-item]');
    this.selectedAccountForDeleting = page.locator('[data-test=bankaccount-delete]').first();
  }

  async createBankAccount(bankName, routingNumber, accountNumber) {
    await this.createButton.click();
    await this.bankNameField.fill(bankName);
    await this.routingNumberField.fill(routingNumber);
    await this.accountNumberField.fill(accountNumber);
    await this.saveButton.click();
  }
}
