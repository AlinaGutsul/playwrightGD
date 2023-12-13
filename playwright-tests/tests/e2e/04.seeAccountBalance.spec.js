// @ts-check
import { test, expect } from '@playwright/test';
import { bankAccountDetails } from '../../data/bankAccounts';
import { testUser } from '../../data/users';
import { FirstTimeLoginPage } from '../../pages/FirstTimeLoginPage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

// Before each test, log in and set up bank account details if it's the first login
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.userLogin(testUser.username, testUser.password);

  // Check if it's the first-time login and set up bank account details if required
  const firstTimeLoginPage = new FirstTimeLoginPage(page);
  if (await firstTimeLoginPage.onboardingWindow.isVisible()) {
    await firstTimeLoginPage.setupYourBankAccountWhenFirstLogin(bankAccountDetails);
  }
});

// Test to verify visibility and format of account balance on the Home Page after login
test('Should see account details', async ({ page }) => {
  const homePage = new HomePage(page);

  // Verify that the account balance in the left-side menu contains a dollar sign ('$')
  await expect(homePage.leftSideMenu.accountBalance).toContainText('$');

  // Verify that the account balance in the left-side menu contains a decimal point ('.')
  await expect(homePage.leftSideMenu.accountBalance).toContainText('.');
});
