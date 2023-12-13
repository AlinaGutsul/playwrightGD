import { generateStringField } from '../helpers/dataHelper';
import { defaultUser, testUser } from './users';

export const requestDetails = {
  amount: '25',
  note: 'Can you borrow me 25$ please?',
};

export const payDetails = {
  amount: '100',
  note: 'Thank you for service!',
};

export const commentTransaction = {
  text: 'Fast transaction!',
};

export const paymentTransaction = {
  amount: 3,
  description: 'Verify that payment transaction works correctly',
  receiverId: defaultUser.id,
  senderId: testUser.id,
  transactionType: 'payment',
  status: 'complete',
};

export const invalidPaymentTransaction = {
  amount: 'aBccccc',
  description: 'Verify that payment transaction with text in amount field fails ',
  receiverId: defaultUser.id,
  senderId: testUser.id,
  transactionType: 'payment',
};

export const invalidPaymentTransactionError = {
  value: invalidPaymentTransaction.amount,
  msg: 'Invalid value',
  param: 'amount',
  location: 'body',
};

export const paymentRequestTransaction = {
  amount: 10,
  description: 'Verify that payment request transaction works correctly',
  receiverId: defaultUser.id,
  senderId: testUser.id,
  transactionType: 'request',
  requestStatus: 'pending',
  status: 'pending',
};

export const invalidPaymentRequestTransaction = {
  amount: 'aBcD1',
  description: 'Verify that payment request transaction with text in amount field fails ',
  receiverId: defaultUser.id,
  senderId: testUser.id,
  transactionType: 'request',
};

export const invalidPaymentRequestTransactionError = {
  value: invalidPaymentRequestTransaction.amount,
  msg: 'Invalid value',
  param: 'amount',
  location: 'body',
};

export const testTransaction = {
  id: 'D4a44CsAh2M',
  uuid: '632f36cd-b558-4fa9-ac54-33310f9df51f',
  source: 'RskoB7r4Bic',
  amount: 39390,
  description: 'Payment: t45AiwidW to qywYp6hS0U',
  privacyLevel: 'private',
  receiverId: 'qywYp6hS0U',
  senderId: 't45AiwidW',
  balanceAtCompletion: 12468,
  status: 'pending',
};

export const commentTestTransaction = {
  transactionId: testTransaction.transactionId,
  content: generateStringField(10),
};
