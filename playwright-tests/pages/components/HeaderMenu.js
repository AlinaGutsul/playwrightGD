export class HeaderMenu {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.hamburgerButton = page.locator('[data-test=sidenav-toggle]');
    this.newTransactionButton = page.locator('[data-test=nav-top-new-transaction]');
    this.notificationsButton = page.locator('[data-test=nav-top-notifications-count]');
  }
}
