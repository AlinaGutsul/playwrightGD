describe('User login', () => {
    let users;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
    });
  
    it('should log in', () => {
      cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  
    it('should fail log in on invalid credentials', () => {
      cy.loginRequest(users.invalidUser.username, users.invalidUser.password).then(response => {
        expect(response.status).to.eq(401);
      });
    });
  });