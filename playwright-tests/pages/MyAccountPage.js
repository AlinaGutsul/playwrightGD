export class MyAccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('[name=firstName]');
    this.lastNameField = page.locator('[name=lastName]');
    this.emailField = page.locator('[name=email]');
    this.phoneNumberField = page.locator('[name=phoneNumber]');
    this.saveButton = page.locator('[data-test=user-settings-submit]');
  }

  async updateTheField(locator, fieldContent) {
    await locator.click();
    await this.page.keyboard.press('Meta+A+Backspace');
    await locator.fill(fieldContent);
  }

  async updateUserSettings(firstName, lastName, email, phoneNumber) {
    await this.updateTheField(this.firstNameField, firstName);
    await this.updateTheField(this.lastNameField, lastName);
    await this.updateTheField(this.emailField, email);
    await this.updateTheField(this.phoneNumberField, phoneNumber);
    await this.saveButton.click();
  }
}
