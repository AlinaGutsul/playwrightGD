describe('List of bank accounts', () => {
    let users;
    let bankAccounts;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
      cy.fixture('bankAccounts').then(data => {
        bankAccounts = data;
      });
    });
  
    it('Should get list of bank accounts', () => {
        cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
            expect(response.status).to.eq(200);
          });
      cy.request({
        method: 'GET',
        url: '/bankAccounts',
      }).then(response => {
        expect(response.body.results).to.be.a('array');
        const searchedBankAccount = response.body.results.find(
          bankAccount => bankAccount.accountNumber === bankAccounts.testUserBankAccount.accountNumber
        );
        expect(searchedBankAccount).to.exist;
      });
    });
  });