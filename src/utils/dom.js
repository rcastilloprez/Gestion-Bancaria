// src/utils/dom.js — helpers para el DOM

/** Selecciona un elemento o lanza error si no existe */
export const $  = (sel, ctx = document) => ctx.querySelector(sel);

/** Selecciona múltiples elementos */
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** Crea un elemento con atributos y contenido HTML opcionales */
export const createElement = (tag, attrs = {}, html = '') => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  el.innerHTML = html;
  return el;
};

/** Muestra/oculta con clase CSS 'hidden' */
export const toggleVisibility = (el, visible) => el.classList.toggle('hidden', !visible);

/** Limpia el contenido de un elemento */
export const clearElement = (el) => { el.innerHTML = ''; };
