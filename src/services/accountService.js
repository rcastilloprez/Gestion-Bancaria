// src/services/accountService.js — lógica de negocio para cuentas
// Las páginas/componentes llaman a este servicio, nunca a ApiClient directamente.

import ApiClient from '../api/client.js';
import EventBus  from '../events/EventBus.js';

const AccountService = (() => {
  const getAll  = ()         => ApiClient.get('/accounts');

  const getById = (id)       => ApiClient.get(`/accounts/${id}`);

  const create = async (data) => {
    const newAccount = await ApiClient.post('/accounts', data);
    EventBus.emit('account:created', newAccount);
    return newAccount;
  };

  const update = async (id, data) => {
    const updated = await ApiClient.put(`/accounts/${id}`, data);
    EventBus.emit('account:updated', updated);
    return updated;
  };

  const remove = async (id) => {
    await ApiClient.delete(`/accounts/${id}`);
    EventBus.emit('account:deleted', { id });
  };

  return { getAll, getById, create, update, remove };
})();

export default AccountService;
