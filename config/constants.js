// config/constants.js — valores globales del proyecto

export const API_BASE_URL = 'http://localhost:3000';

export const ROUTES = {
  DASHBOARD:    '/dashboard',
  ACCOUNTS:     '/accounts',
  TRANSACTIONS: '/transactions',
};

export const ACCOUNT_TYPES = {
  AHORRO: 'Ahorro',
  CORRIENTE: 'Corriente',
  INVERSION: 'Inversión'
};

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposito',
  WITHDRAWAL: 'retiro',
  TRANSFER: 'transferencia'
};
