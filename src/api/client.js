// src/api/client.js — wrapper de fetch para todas las peticiones HTTP
// Los servicios usan este cliente, nunca fetch directamente.

import { API_BASE_URL } from '../../config/constants.js';

const ApiClient = (() => {
  const buildHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  const handleResponse = async (response) => {
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || `Error HTTP ${response.status}`);
    }
    return response.json();
  };

  const get = (endpoint) =>
    fetch(`${API_BASE_URL}${endpoint}`, { method: 'GET', headers: buildHeaders() })
      .then(handleResponse);

  const post = (endpoint, body) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse);

  const put = (endpoint, body) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse);

  const del = (endpoint) =>
    fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE', headers: buildHeaders() })
      .then(handleResponse);

  return { get, post, put, delete: del };
})();

export default ApiClient;
