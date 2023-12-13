export class Transactions {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.everyoneTransactions = page.locator('[data-test=nav-public-tab]');
    this.friendsTransactions = page.locator('[data-test=nav-contacts-tab]');
    this.myTransactions = page.locator('[data-test=nav-personal-tab]');
    this.transactionsCategoryTitle = page.locator(
      'div.MuiListSubheader-root.MuiListSubheader-sticky.MuiListSubheader-gutters'
    );
    this.selectedTransaction = page.locator('[data-test*=transaction-item]').first();
    this.transactionDetailsHeader = page.locator('[data-test=transaction-detail-header]');
    this.likeTransaction = page.locator('[data-test*=transaction-like-button]');
    this.writeCommentField = page.locator('[name=content]');
    this.listOfComments = page.locator('[data-test=comments-list]');
  }

  async commentTransaction(text) {
    await this.writeCommentField.fill(text);
    await this.page.keyboard.press('Enter');
  }
}
