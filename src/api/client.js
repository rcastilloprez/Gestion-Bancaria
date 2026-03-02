// src/api/client.js — wrapper de fetch para todas las peticiones HTTP
// Los servicios usan este cliente, nunca fetch directamente.

import { API_BASE_URL } from '../../config/constants.js';

const ApiClient = (() => {
  const buildHeaders = () => {
    // TODO: retornar { 'Content-Type': 'application/json', Authorization: bearer token }
  };

  const handleResponse = async (response) => {
    // TODO: si !response.ok lanzar error; si ok retornar response.json()
  };

  const get    = (endpoint)       => { /* TODO: fetch GET */ };
  const post   = (endpoint, body) => { /* TODO: fetch POST con JSON.stringify(body) */ };
  const put    = (endpoint, body) => { /* TODO: fetch PUT  con JSON.stringify(body) */ };
  const del    = (endpoint)       => { /* TODO: fetch DELETE */ };

  return { get, post, put, delete: del };
})();

export default ApiClient;
