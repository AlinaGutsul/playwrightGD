describe('Delete bank account', () => {
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
  
    it('Should delete a bank account', () => {
        cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
            expect(response.status).to.eq(200);
          });

      cy.request({
        method: 'DELETE',
        url: `/bankAccounts/${bankAccounts.testUserBankAccount.id}`,
      }).then(response => {
        expect(response.status).to.eq(200);
      });
  
      cy.request({
        method: 'GET',
        url: '/bankAccounts/',
      }).then(response => {
        cy.log(JSON.stringify(response));
        expect(response.status).to.eq(200);
        expect(response.body.results).to.be.a('array');
        const deletedBankAccount = response.body.results.find(
          bankAccount => bankAccount.isDeleted === !bankAccounts.testUserBankAccount.isDeleted
        );
        expect(deletedBankAccount).to.exist;
      });
    });
  });