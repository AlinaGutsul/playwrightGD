import { generateNumber } from '../support/methods';

describe('Payment request transaction', () => {
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

  it('Should submit payment request transaction', () => {
    cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
        expect(response.status).to.eq(200);
      });
    const paymentRequestTransaction = {
      amount: generateNumber(2),
      description: 'Verify that payment request transaction works correctly',
      receiverId: users.defaultUser.id,
      senderId: users.testUser.id,
      transactionType: 'request',
      requestStatus: 'pending',
      status: 'pending',
    };

    cy.request({
      method: 'POST',
      url: '/transactions',
      body: paymentRequestTransaction,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.transaction).to.include({
        description: paymentRequestTransaction.description,
        receiverId: paymentRequestTransaction.receiverId,
        senderId: paymentRequestTransaction.senderId,
        status: paymentRequestTransaction.status,
      });
    });
  });
});