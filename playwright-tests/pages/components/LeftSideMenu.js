export class LeftSideMenu {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.userName = page.locator('[data-test=sidenav-username]');
    this.logOutLink = page.locator('[data-test=sidenav-signout]');
    this.fullName = page.locator('[data-test=sidenav-user-full-name]');
    this.accountBalance = page.locator('[data-test=sidenav-user-balance]');
    this.homePageButton = page.locator('[data-test=sidenav-home]');
    this.myAccountButton = page.locator('[data-test=sidenav-user-settings]');
    this.bankAccountsButton = page.locator('[data-test=sidenav-bankaccounts]');
    this.notificationsButton = page.locator('[data-test=sidenav-notifications]');
  }
}
