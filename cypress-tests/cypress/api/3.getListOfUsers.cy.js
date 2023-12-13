describe('List of users', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    it('Should get list of users', () => {
        cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
            expect(response.status).to.eq(200);
          });
      cy.request({
        method: 'GET',
        url: '/users',
      }).then(response => {
        expect(response.body.results).to.be.a('array');
        const searchedUser = response.body.results.find(
          user => user.firstName === users.defaultUser.firstName
        );
        expect(searchedUser).to.exist;
      });
    });
  });