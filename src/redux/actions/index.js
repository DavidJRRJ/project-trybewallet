import { USER_EMAIL } from './actionTypes';

export const actionEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const actionWallet = (wallet) => ({
  type: 'WALLET',
  wallet,
});
