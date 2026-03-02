// src/services/accountService.js — lógica de negocio para cuentas
// Las páginas/componentes llaman a este servicio, nunca a ApiClient directamente.

import ApiClient from '../api/client.js';
import EventBus  from '../events/EventBus.js';

const AccountService = (() => {
  const getAll  = ()           => { /* TODO: ApiClient.get('/accounts') */ };
  const getById = (id)         => { /* TODO: ApiClient.get(`/accounts/${id}`) */ };
  const create  = (data)       => { /* TODO: ApiClient.post + EventBus.emit('account:created') */ };
  const update  = (id, data)   => { /* TODO: ApiClient.put  + EventBus.emit('account:updated') */ };
  const remove  = (id)         => { /* TODO: ApiClient.delete + EventBus.emit('account:deleted') */ };

  return { getAll, getById, create, update, remove };
})();

export default AccountService;
