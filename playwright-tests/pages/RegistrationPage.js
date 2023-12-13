export class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.confirmPasswordField = page.locator('#confirmPassword');
    this.signUpButton = page.locator('.MuiButton-label');
  }

  async userSignUp(firstName, lastName, username, password) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.signUpButton.click();
  }
}
