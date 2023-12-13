describe('Get user profile by username', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    it('Should get user profile by username', () => {
        cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
            expect(response.status).to.eq(200);
          });
      cy.request({
        method: 'GET',
        url: `/users/profile/${users.testUser.username}`,
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.user).to.include({
          firstName: users.testUser.firstName,
          lastName: users.testUser.lastName,
        });
      });
    });
  });