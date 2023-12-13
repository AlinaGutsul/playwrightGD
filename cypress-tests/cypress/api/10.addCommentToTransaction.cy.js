import { generateString } from '../support/methods';

describe('Transaction comments', () => {
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

  beforeEach(() => {
    cy.loginRequest(users.testUser.username, users.testUser.password).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should add comment to transaction', () => {
    const commentTransaction = {
      content: generateString(10),
    };
    cy.request({
      method: 'POST',
      url: `/comments/${transactions.testTransaction.id}`,
      body: commentTransaction,
    }).then(response => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: `/comments/${transactions.testTransaction.id}`,
    }).then(response => {
      const searchedComment = response.body.comments.find(
        comment => comment.content === commentTransaction.content
      );
      expect(searchedComment).to.exist;
    });
  });
});
