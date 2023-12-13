import { generateNumber } from '../support/methods';

describe('Payment transaction', () => {
  let users;
  let transactions;

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
    cy.fixture('transactions').then(data => {
      transactions = data;
    });
  });

  it('Should submit payment transaction', () => {
    cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
        expect(response.status).to.eq(200);
      });
    const paymentTransaction = {
      amount: generateNumber(2),
      description: 'Verify that payment transaction works correctly',
      receiverId: users.defaultUser.id,
      senderId: users.testUser.id,
      transactionType: 'payment',
      status: 'complete',
    };

    cy.request({
      method: 'POST',
      url: '/transactions',
      body: paymentTransaction,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.transaction).to.include({
        description: paymentTransaction.description,
        receiverId: paymentTransaction.receiverId,
        senderId: paymentTransaction.senderId,
        status: paymentTransaction.status,
      });
    });
  });
});