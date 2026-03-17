// src/services/accountService.js — lógica de negocio para cuentas
// Las páginas/componentes llaman a este servicio, nunca a ApiClient directamente.

import AccountRepository from '../repositories/accountRepository.js';
import EventBus  from '../events/EventBus.js';

const AccountService = (() => {
  const getAll  = ()         => AccountRepository.getAll();

  const getById = (id)       => AccountRepository.getById(id);

  const create = async (data) => {
    const newAccount = await AccountRepository.create(data);
    EventBus.emit('account:created', newAccount);
    return newAccount;
  };

  const update = async (id, data) => {
    const updated = await AccountRepository.update(id, data);
    EventBus.emit('account:updated', updated);
    return updated;
  };

  const remove = async (id) => {
    await AccountRepository.remove(id);
    EventBus.emit('account:deleted', { id });
  };

  return { getAll, getById, create, update, remove };
})();

export default AccountService;
