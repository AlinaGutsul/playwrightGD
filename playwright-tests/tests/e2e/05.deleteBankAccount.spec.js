// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { testUser } from '../../data/users';
import { BankAccountsPage } from '../../pages/BankAccountsPage';

// Before each test, navigate to the bank accounts page after logging in
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.userLogin(testUser.username, testUser.password);

  const homePage = new HomePage(page);
  await homePage.leftSideMenu.bankAccountsButton.click();
});

// Test to delete a bank account
test('Should delete bank account', async ({ page }) => {
  const bankAccountsPage = new BankAccountsPage(page);

  // Get the count of delete buttons before attempting to delete an account
  const counterBeforeDeleting = await bankAccountsPage.deleteButton.count();

  // Select an account for deletion (assuming there's a clickable element for this purpose)
  await bankAccountsPage.selectedAccountForDeleting.click();

  // Get the count of delete buttons after attempting to delete the account
  const counterAfterDeleting = await bankAccountsPage.deleteButton.count();

  // Verify if the count of delete buttons decreased by 1 after attempting to delete an account
  expect(counterBeforeDeleting === counterAfterDeleting + 1);
});
