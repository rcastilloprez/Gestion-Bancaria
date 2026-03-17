// src/services/transactionService.js — lógica de negocio para transacciones

import AccountRepository from '../repositories/accountRepository.js';
import TransactionRepository from '../repositories/transactionRepository.js';
import EventBus  from '../events/EventBus.js';

const TransactionService = (() => {
  const getAll       = ()         => TransactionRepository.getAll();
  
  const getById      = (id)       => TransactionRepository.getById(id);
  
  const deposit = async (accountId, payload) => {
    const account = await AccountRepository.getById(accountId);
    const amount = Number(payload?.amount ?? payload);

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('El monto del deposito debe ser mayor a cero.');
    }

    const updatedAccount = await AccountRepository.update(accountId, {
      ...account,
      balance: Number(account.balance) + amount,
    });

    const createdTransaction = await TransactionRepository.create({
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

  const withdraw = async (accountId, payload) => {
    const account = await AccountRepository.getById(accountId);
    const amount = Number(payload?.amount ?? payload);

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('El monto del retiro debe ser mayor a cero.');
    }

    if (Number(account.balance) < amount) {
      throw new Error('Fondos insuficientes.');
    }

    const updatedAccount = await AccountRepository.update(accountId, {
      ...account,
      balance: Number(account.balance) - amount,
    });

    const createdTransaction = await TransactionRepository.create({
      accountId,
      type: 'retiro',
      amount,
      description: payload?.description || 'Retiro',
      date: payload?.date || new Date().toISOString(),
    });

    EventBus.emit('transaction:created', createdTransaction);
    EventBus.emit('account:updated', updatedAccount);

    return { transaction: createdTransaction, account: updatedAccount };
  };
  
  const transfer = async (payload) => {
    const fromAccountId = payload?.fromAccountId;
    const toAccountId = payload?.toAccountId;
    const amount = Number(payload?.amount);

    if (!fromAccountId || !toAccountId) {
      throw new Error('Debes indicar cuenta origen y destino.');
    }

    if (String(fromAccountId) === String(toAccountId)) {
      throw new Error('La cuenta origen y destino no pueden ser la misma.');
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('El monto de la transferencia debe ser mayor a cero.');
    }

    const fromAccount = await AccountRepository.getById(fromAccountId);
    const toAccount = await AccountRepository.getById(toAccountId);

    if (Number(fromAccount.balance) < amount) {
      throw new Error('Fondos insuficientes en la cuenta origen.');
    }

    const updatedFromAccount = await AccountRepository.update(fromAccountId, {
      ...fromAccount,
      balance: Number(fromAccount.balance) - amount,
    });

    const updatedToAccount = await AccountRepository.update(toAccountId, {
      ...toAccount,
      balance: Number(toAccount.balance) + amount,
    });

    const createdTransaction = await TransactionRepository.create({
      accountId: fromAccountId,
      toAccountId,
      type: 'transferencia',
      amount,
      description: payload?.description || 'Transferencia',
      date: payload?.date || new Date().toISOString(),
    });

    EventBus.emit('transaction:created', createdTransaction);
    EventBus.emit('account:updated', updatedFromAccount);
    EventBus.emit('account:updated', updatedToAccount);

    return {
      transaction: createdTransaction,
      fromAccount: updatedFromAccount,
      toAccount: updatedToAccount,
    };
  };

  return { getAll, getById, deposit, withdraw, transfer };
})();

export default TransactionService;
