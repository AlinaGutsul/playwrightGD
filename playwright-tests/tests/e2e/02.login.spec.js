// @ts-check
import { test, expect } from '@playwright/test';
import { bankAccountDetails } from '../../data/bankAccounts';
import { testUser, nonExistingUser, firstLoginUser } from '../../data/users';
import { FirstTimeLoginPage } from '../../pages/FirstTimeLoginPage';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { RegistrationPage } from '../../pages/RegistrationPage';

// Test to log in with existing credentials
test('should log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.userLogin(testUser.username, testUser.password);
  const homePage = new HomePage(page);
  await expect(homePage.leftSideMenu.userName).toHaveText(`@${testUser.username}`);
});

// Test to check login error on invalid credentials
test('should see log in error on invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.userLogin(nonExistingUser.username, nonExistingUser.password);
  await expect(loginPage.loginError).toBeVisible();
});

// Test to log in for the first time, set up a bank account, and verify successful login
test('Should log in with existing account for the first time and add bank account', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Initiating sign-up process (possibly a double-click protection or similar)
  await loginPage.signUpButton.click();
  await loginPage.signUpButton.click();

  const registrationPage = new RegistrationPage(page);

  // Registering the user for the first time
  await registrationPage.userSignUp(
    firstLoginUser.firstName,
    firstLoginUser.lastName,
    firstLoginUser.username,
    firstLoginUser.password
  );

  // Verifying the visibility of the sign-in button after registration
  await expect(loginPage.signInButton).toBeVisible();

  // Logging in with the newly registered credentials
  await loginPage.userLogin(firstLoginUser.username, firstLoginUser.password);

  // Setting up bank account details for the first-time login
  const firstTimeLoginPage = new FirstTimeLoginPage(page);
  await firstTimeLoginPage.setupYourBankAccountWhenFirstLogin(bankAccountDetails);

  // Verifying successful login and username visibility on the home page
  const homePage = new HomePage(page);
  await expect(homePage.leftSideMenu.userName).toHaveText(`@${firstLoginUser.username}`);
});
