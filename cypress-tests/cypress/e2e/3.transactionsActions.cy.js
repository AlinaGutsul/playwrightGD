import { generateNumber, generateString } from '../support/methods';

describe('Account transactions', () => {
  let users;
  const amountField = generateNumber(2);
  const addNoteField = generateString(8);

  before(() => {
    cy.fixture('users').then(data => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.login(users.testUser.username, users.testUser.password);
  });

  afterEach(() => {
    cy.clearLocalStorage('authState');
  });

  it('Should see account transactions history', function () {
    cy.seeAccountTransactions();
    cy.get('div.MuiListSubheader-root.MuiListSubheader-sticky').should('have.text', 'Personal');
    cy.get('[data-test*=transaction-item]').should('exist');
  });

  it('Should see account transaction details', function () {
    cy.seeAccountTransactions();
    cy.get('div.MuiListSubheader-root.MuiListSubheader-sticky').should('have.text', 'Personal');
    cy.seeTransactionDetails();
    cy.get('[data-test=transaction-detail-header]').should('be.visible');
    cy.get('span[data-test^="transaction-amount-"]')
      .should('be.visible')
      .invoke('text')
      .should('match', /[+-]?\$\d+\.\d{2}/);
  });

  it('Should be able to like transaction', function () {
    cy.seeTransactionDetails();
    cy.get('[data-test=transaction-detail-header]').should('be.visible');

    cy.get('div[data-test^="transaction-like-count-"]').then(($element) => {
        cy.get('button[data-test*="transaction-like-button"]').then(($button) => {
            if (!$button.is(':disabled')) {
                const initialCount = parseInt($element.text());
                cy.get('button[data-test*="transaction-like-button"]').click({ force: true });
                cy.get('button[data-test*="transaction-like-button"]').should('be.disabled');
                cy.get('div[data-test^="transaction-like-count-"]').should(($newElement) => {
                    const newCount = parseInt($newElement.text());
                    expect(newCount).to.equal(initialCount + 1);
                });
            }
        });
    });
});

  it('Should be able to comment transaction', function () {
    cy.seeTransactionDetails();
    cy.get('[data-test=transaction-detail-header]').should('be.visible');
    const commentField = cy.get('[name=content]');
    const commentText = generateString(10);
    commentField.type(`${commentText}{enter}`, { force: true });
    cy.get('li > div > span').should('include.text', `${commentText}`);
  });

  it('Should submit payment request transaction', function () {
    cy.searchUserForTransaction('kaylin');
    cy.submitRequestTransaction(amountField, addNoteField);
    cy.get('[data-test=alert-bar-success]').should('have.text', 'Transaction Submitted!');
    const expectedText = `Requested $${amountField}.00 for ${addNoteField}`;
    cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
      .should('have.text', expectedText);
});

  it('Should submit payment transaction', function () {
    cy.searchUserForTransaction('kaylin');
    cy.submitPaymentTransaction(amountField, addNoteField);
    const expectedText = `Paid $${amountField}.00 for ${addNoteField}`;
    cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
      .should('have.text', expectedText);
    cy.get('[data-test=alert-bar-success]').should('have.text', 'Transaction Submitted!');
  });
});
