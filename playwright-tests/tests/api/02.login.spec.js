// Importing necessary modules from Playwright test library and user data
import { test, expect } from '@playwright/test';
import { testUser, nonExistingUser } from '../../data/users';

// Test case to log in with valid credentials
test('should log in', async ({ request }) => {
  // Making a POST request to login with valid user credentials
  const loginResponse = await request.post('/login', {
    data: {
      username: testUser.username,
      password: testUser.password,
      type: 'LOGIN',
    },
  });

  // Verifying if the login with valid credentials was successful (HTTP status code 200 OK)
  expect(loginResponse.ok()).toBeTruthy();
});

// Test case to check login failure with invalid credentials
test('should fail log in on invalid credentials', async ({ request }) => {
  // Making a POST request to login with invalid user credentials
  const loginResponse = await request.post('/login', {
    data: {
      username: nonExistingUser.username,
      password: nonExistingUser.password,
      type: 'LOGIN',
    },
  });

  // Verifying if the login with invalid credentials failed (HTTP status code not 200 OK)
  expect(loginResponse.ok()).toBeFalsy();
});
