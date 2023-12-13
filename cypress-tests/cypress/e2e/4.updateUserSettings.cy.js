import { generateNumber, generateString } from '../support/methods';

describe('User settings', () => {
  let users;
  const newPhoneNumber = generateNumber(6);
  const newEmail = generateString(5);

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.login(users.testUser.username, users.testUser.password);
  });

  it('Should update account user settings', function () {
    cy.intercept('PATCH', "http://localhost:3001/users/t45AiwidW").as('userSettings');
    cy.get('[data-test=sidenav-user-settings]').click();
    cy.get('input[name="phoneNumber"]').type(`{selectall}${newPhoneNumber}`);
    cy.get('#user-settings-email-input').type(`{selectall}${newEmail}@gmail.com`);
    cy.get('button[type=submit]').click();
    cy.wait('@userSettings').then((interception) => {
      console.log('Intercepted request:', interception);
      console.log('Intercepted request status:', interception.response.statusCode); 
      expect(interception.response.statusCode).to.equal(204);
    });
    
    cy.reload();
    cy.get('#user-settings-phoneNumber-input').should('include.value', newPhoneNumber);
    cy.get('#user-settings-email-input').should('include.value', newEmail);
  });
});
