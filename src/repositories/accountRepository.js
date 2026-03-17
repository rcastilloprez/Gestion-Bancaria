import ApiClient from '../api/client.js';

const AccountRepository = (() => {
  const getAll = () => ApiClient.get('/accounts');
  const getById = (id) => ApiClient.get(`/accounts/${id}`);
  const create = (data) => ApiClient.post('/accounts', data);
  const update = (id, data) => ApiClient.put(`/accounts/${id}`, data);
  const remove = (id) => ApiClient.delete(`/accounts/${id}`);

  return { getAll, getById, create, update, remove };
})();

export default AccountRepository;
