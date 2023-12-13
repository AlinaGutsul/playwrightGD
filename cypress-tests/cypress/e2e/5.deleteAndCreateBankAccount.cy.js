describe('Bank account', () => {
  let users;
  let createdAccountName;
 
  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
    cy.clearLocalStorage('authState');
  });
 
  beforeEach(() => {
    cy.visit('/');
    cy.login(users.testUser.username, users.testUser.password);
    cy.get('[data-test=sidenav-username]').should('exist').contains(users.testUser.username);
    cy.get('[data-test=sidenav-bankaccounts]').click();
  });
 
  it('Should add new bank account', function () {
    cy.createBankAccount().then(accountName => {
      createdAccountName = accountName;
      cy.get('[data-test="bankaccount-list"]').should('contain', createdAccountName);
    });
  });
});
