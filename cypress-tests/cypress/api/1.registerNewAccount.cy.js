import { generateNumber, generateString } from '../support/methods';

describe('Registration', () => {
  let users;
  const newUser = {
    firstName: generateString(5),
    lastName: generateString(5),
    username: generateString(5),
    password: generateString(3) + generateNumber(3),
  };

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  it('Should register a new account', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
        confirmPassword: newUser.password,
      },
    }).then(response => {
      expect(response.status).to.eq(201);
    });

    cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: '/users',
    }).then(response => {
      expect(response.body.results).to.be.a('array');
      const searchedUser = response.body.results.find(user => user.firstName === newUser.firstName);
      expect(searchedUser).to.exist;
    });
  });
});