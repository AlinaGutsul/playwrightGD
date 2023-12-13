import { generateString } from '../support/methods';

describe('Registration and Login spec', () => {
  let users;

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should register a new account and then log in', function () {
    
    const firstName = generateString(5);
    const lastName = generateString(5);
    const username = generateString(5);

    // Register a new account
    cy.get('a[data-test="signup"]').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#username').type(username);
    cy.get('#password').type(users.newUser.password);
    cy.get('#confirmPassword').type(users.newUser.password);
    cy.get('.MuiButton-label').click();
    cy.url().should('include', '/signin');
    cy.get('a[data-test="signup"]').should('be.visible');
    cy.login(username, users.newUser.password);
    cy.get('[data-test=sidenav-username]').should('exist').contains(username);
  });

  it('should see log in error on invalid credentials', function () {
    cy.visit('/signin');
    cy.login(users.invalidUser.username, users.invalidUser.password);
    cy.get('.MuiAlert-message').should('exist').should('have.text', 'Username or password is invalid');
  });  
});