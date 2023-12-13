// Importing necessary modules from Playwright test library and user/bank account data
import { test, expect } from '@playwright/test';
import { testUserBankAccount } from '../../data/bankAccounts';
import { testUser } from '../../data/users';
import { loggedInUserApiContext } from '../../utilities/apiUtilities';

// Before all tests, setting up the logged-in user's API context using testUser credentials
test.beforeAll(async ({ playwright, request }) => {
  await loggedInUserApiContext(playwright, request, testUser);
});

// Test case to delete a bank account associated with the logged-in user
test('Should delete a bank account', async ({ request }) => {
  // Making a DELETE request to delete a specific bank account using its ID
  const deleteBankAccount = await request.delete(`/bankAccounts/${testUserBankAccount.id}`);
  
  // Verifying if the deletion request was successful (HTTP status code 200 OK)
  expect(deleteBankAccount.ok()).toBeTruthy();

  // Getting the list of bank accounts associated with the logged-in user
  const getListOfBankAccounts = await request.get('/bankAccounts');
  const listOfBankAccounts = await getListOfBankAccounts.json();
  const arrayOfBankAccounts = listOfBankAccounts.results;
  
  // Verifying if the deleted bank account is no longer present in the list of bank accounts
  expect(arrayOfBankAccounts).toContainEqual(
    expect.objectContaining({
      id: testUserBankAccount.id,
      isDeleted: !testUserBankAccount.isDeleted,
    })
  );
});
