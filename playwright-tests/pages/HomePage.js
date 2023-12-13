import { HeaderMenu } from './components/HeaderMenu';
import { LeftSideMenu } from './components/LeftSideMenu';
import { Transactions } from './components/Transactions';

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.transactionSection = new Transactions(page);
    this.leftSideMenu = new LeftSideMenu(page);
    this.headerMenu = new HeaderMenu(page);
  }
}
