// src/services/transactionService.js — lógica de negocio para transacciones

import ApiClient from '../api/client.js';
import EventBus  from '../events/EventBus.js';

const TransactionService = (() => {
  const getAll       = ()         => ApiClient.get('/transactions');
  
  const getById      = (id)       => ApiClient.get(`/transactions/${id}`);
  
  const deposit = async (accountId, payload) => {
    const account = await ApiClient.get(`/accounts/${accountId}`);
    const amount = Number(payload?.amount ?? payload);

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('El monto del deposito debe ser mayor a cero.');
    }

    const updatedAccount = await ApiClient.put(`/accounts/${accountId}`, {
      ...account,
      balance: Number(account.balance) + amount,
    });

    const createdTransaction = await ApiClient.post('/transactions', {
      accountId,
      type: 'deposito',
      amount,
      description: payload?.description || 'Deposito',
      date: payload?.date || new Date().toISOString(),
    });

    EventBus.emit('transaction:created', createdTransaction);
    EventBus.emit('account:updated', updatedAccount);

    return { transaction: createdTransaction, account: updatedAccount };
  };

  const withdraw = async () => {
    throw new Error('withdraw not implemented yet');
  };
  
  const transfer = async () => {
    throw new Error('transfer not implemented yet');
  };

  return { getAll, getById, deposit, withdraw, transfer };
})();

export default TransactionService;
