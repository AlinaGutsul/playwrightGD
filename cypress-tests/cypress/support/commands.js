// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { generateNumber, generateString } from './methods';

Cypress.Commands.add('login', (userName, password) => {
  cy.get('#username').type(userName);
  cy.get('#password').type(password);
  cy.get('[data-test=signin-submit]').click();
});

Cypress.Commands.add('loginRequest', (userName, password) => {
  cy.request({
    method: 'POST',
    url: '/login',
    body: {
      username: userName,
      password: password,
      type: 'LOGIN',
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('seeAccountTransactions', () => {
  cy.get('[data-test=nav-personal-tab]').click();
});

Cypress.Commands.add('seeTransactionDetails', () => {
  const selectedTransaction = cy.get('[data-test*=transaction-item]').first();
  selectedTransaction.click({ force: true });
});

Cypress.Commands.add('createBankAccount', () => {
  const bankName = generateString(5);
  const routingNumber = generateString(9);
  const accountNumber = generateNumber(9);
  cy.get('a[data-test=bankaccount-new]').click({ force: true });
  cy.get('#bankaccount-bankName-input').type(bankName);
  cy.get('#bankaccount-routingNumber-input').type(routingNumber);
  cy.get('#bankaccount-accountNumber-input').type(accountNumber);
  cy.get('button[type=submit]').click();
});

Cypress.Commands.add('searchUserForTransaction', userName => {
  cy.get('[data-test=nav-top-new-transaction]').click();
  cy.get('#user-list-search-input').type(userName, { force: true });
  cy.get('li.MuiListItem-root.MuiListItem-gutters')
    .first()
    .then(selectedUser => {
      selectedUser.click();
    });
});

Cypress.Commands.add('submitPaymentTransaction', (amount, note) => {
  cy.get('#amount').type(amount);
  cy.get('#transaction-create-description-input').type(note);
  cy.get('[data-test=transaction-create-submit-payment]').click();
});

Cypress.Commands.add('submitRequestTransaction', (amount, note) => {
  cy.get('#amount').type(amount);
  cy.get('#transaction-create-description-input').type(note);
  cy.get('[data-test=transaction-create-submit-request]').click();
});
