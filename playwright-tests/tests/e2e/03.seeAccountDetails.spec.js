// @ts-check
import { test, expect } from '@playwright/test';
import { testUser } from '../../data/users';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

// Before each test, login using testUser credentials
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.userLogin(testUser.username, testUser.password);
});

// Test to verify visibility of account details on the Home Page after login
test('Should see account details', async ({ page }) => {
  const homePage = new HomePage(page);

  // Verifying the visibility of the username in the left-side menu
  await expect(homePage.leftSideMenu.userName).toHaveText(`@${testUser.username}`);

  // Verifying the visibility of the user's full name in the left-side menu
  await expect(homePage.leftSideMenu.fullName).toHaveText(
    testUser.firstName + ' ' + testUser.lastName.charAt(0)
  );
});
