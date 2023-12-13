import { generateStringField } from '../helpers/dataHelper';

export const testUser = {
  username: 'Katharina_Bernier',
  password: 's3cret',
  id: 't45AiwidW',
  firstName: 'Edgar',
  lastName: 'Johns',
};

export const nonExistingUser = {
  username: 'invalid_username',
  password: 'invalid_password',
};

export const firstLoginUser = {
  firstName: 'Any',
  lastName: 'Hons',
  username: generateStringField(5),
  password: '123456',
};

export const transactionUser = {
  firstName: 'Kaylin',
  lastName: 'Homenick',
};

export const newUser = {
  firstName: generateStringField(5),
  lastName: generateStringField(5),
  username: generateStringField(5),
  password: '12345',
};

export const defaultUser = {
  id: 'qywYp6hS0U',
  uuid: 'f96efce8-1909-4df4-b5cd-59883cd19c37',
  firstName: 'Arely',
  lastName: 'Kertzmann',
  username: 'Tavares_Barrows',
  password: '$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW',
  email: 'Aniya_Powlowski36@hotmail.com',
  phoneNumber: '537-041-4355',
  avatar: 'https://cypress-realworld-app-svgs.s3.amazonaws.com/qywYp6hS0U.svg',
  defaultPrivacyLevel: 'private',
};
