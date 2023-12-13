// Importing necessary modules from Playwright test library and user data
import { test, expect } from '@playwright/test';
import { newUser, testUser } from '../../data/users';

// Test case to register a new account
test('Should register a new account', async ({ request }) => {
  // Making a POST request to create a new user account
  const registrationResponse = await request.post('/users', {
    data: {
      // Providing user data for registration
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      password: newUser.password,
      confirmPassword: newUser.password,
    },
  });

  // Verifying if the registration was successful (HTTP status code 200 OK)
  expect(registrationResponse.ok()).toBeTruthy();

  // Logging in with test user credentials
  const loginResponse = await request.post('/login', {
    data: {
      username: testUser.username,
      password: testUser.password,
      type: 'LOGIN',
    },
  });

  // Verifying if the login was successful (HTTP status code 200 OK)
  expect(loginResponse.ok()).toBeTruthy();

  // Making a GET request to retrieve a list of users
  const getListOfUsersResponse = await request.get('/users');
  
  // Verifying if the request to get the list of users was successful (HTTP status code 200 OK)
  expect(getListOfUsersResponse.ok()).toBeTruthy();
  
  // Parsing the JSON response containing the list of users
  const listOfUsers = await getListOfUsersResponse.json();
  
  // Extracting the array of users from the response
  const arrayOfUsers = await listOfUsers.results;
  
  // Finding the registered user from the list of users
  const searchedUser = arrayOfUsers.find(user => user.firstName === newUser.firstName);
  
  // Verifying if the registered user is present in the list of users
  expect(arrayOfUsers.includes(searchedUser)).toBeTruthy();
});
