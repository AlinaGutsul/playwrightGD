describe('Notifications list', () => {
    let users;
    let notifications;
  
    before(() => {
      cy.fixture('users').then(data => {
        users = data;
      });
      cy.fixture('notifications').then(data => {
        notifications = data;
      });
    });
  
    it('Should get notifications list', () => {
        cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
            expect(response.status).to.eq(200);
          });
      cy.request({
        method: 'GET',
        url: '/notifications',
      }).then(response => {
        expect(response.body.results).to.be.a('array');
        expect(response.body.results[response.body.results.length - 1]).to.include({
          id: notifications.earliestNotification.id,
          status: notifications.earliestNotification.status,
          transactionId: notifications.earliestNotification.transactionId,
          userFullName: notifications.earliestNotification.userFullName,
          userId: notifications.earliestNotification.userId,
          uuid: notifications.earliestNotification.uuid,
        });
      });
    });
  });