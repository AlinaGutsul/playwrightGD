describe('Account details', () => {
  let users;

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.login(users.testUser.username, users.testUser.password);
  });
  it('Should see account details', function () {
    cy.get('[data-test=sidenav-username]').should('exist').contains(users.testUser.username); 
    cy.get('[data-test=sidenav-user-full-name]').should('have.text', users.testUser.firstName + ' ' + users.testUser.lastName.charAt(0));
    cy.get('[data-test=sidenav-username]').should('have.text', `@${users.testUser.username}`);
  });

  it('Should see account balance', function () {
    cy.get('[data-test=sidenav-user-balance]').should('be.visible').then((element) => {
      const text = element.text().trim(); 
      expect(text).to.match(/^\$\d{1,3}(,\d{3})*(\.\d{2})?$/);
    });
  });   
});
