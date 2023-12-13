// @ts-check
import { test, expect } from '@playwright/test';
import { newUser } from '../../data/users';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';

// Test to register a new account
test('Should register new account', async ({ page }) => {
  // Creating an instance of LoginPage
  const loginPage = new LoginPage(page);

  // Navigating to the login page
  await loginPage.goto();

  // Clicking the sign-up button twice (assuming there might be a double-click protection or similar)
  await loginPage.signUpButton.click();
  await loginPage.signUpButton.click();

  // Creating an instance of RegistrationPage
  const registrationPage = new RegistrationPage(page);

  // Performing user sign-up using provided user data
  await registrationPage.userSignUp(
    newUser.firstName,
    newUser.lastName,
    newUser.username,
    newUser.password
  );

  // Verifying if the sign-in button is visible after registration
  await expect(loginPage.signInButton).toBeVisible();
});
