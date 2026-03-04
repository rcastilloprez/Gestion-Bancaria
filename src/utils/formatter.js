// src/utils/formatter.js — funciones puras para mostrar datos en la UI

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' });

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
