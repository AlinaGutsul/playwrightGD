export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.userNameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.signInButton = page.locator('[data-test=signin-submit]');
    this.loginError = page.locator('.MuiAlert-message');
    this.rememberMeCheckbox = page.locator('input[name="remember"]');
    this.signUpButton = page.locator('[data-test=signup]');
  }

  async goto() {
    await this.page.goto('/signin');
  }

  async userLogin(username, password) {
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }
}
