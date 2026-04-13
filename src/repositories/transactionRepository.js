import ApiClient from '../api/client.js';

const TransactionRepository = (() => {
  const getAll = () => ApiClient.get('/transactions');
  const getById = (id) => ApiClient.get(`/transactions/${id}`);
  const create = (data) => ApiClient.post('/transactions', data);
  const deleteById = (id) => ApiClient.delete(`/transactions/${id}`);
  return { getAll, getById, create, deleteById };
})();

export default TransactionRepository;
