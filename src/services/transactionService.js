// src/services/transactionService.js — lógica de negocio para transacciones

import ApiClient from '../api/client.js';
import EventBus  from '../events/EventBus.js';

const TransactionService = (() => {
  const getAll       = (params = {})         => { /* TODO: ApiClient.get('/transactions?...') */ };
  const getByAccount = (accountId, params)   => { /* TODO: ApiClient.get(`/accounts/${accountId}/transactions`) */ };
  const deposit      = (accountId, payload)  => { /* TODO: ApiClient.post + EventBus.emit('transaction:created') */ };
  const withdraw     = (accountId, payload)  => { /* TODO: ApiClient.post + EventBus.emit('transaction:created') */ };
  const transfer     = (payload)             => { /* TODO: ApiClient.post('/transactions/transfer') + emit */ };

  return { getAll, getByAccount, deposit, withdraw, transfer };
})();

export default TransactionService;
