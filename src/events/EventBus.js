// src/events/EventBus.js — comunicación desacoplada entre módulos (pub/sub)
// Uso: EventBus.on('evento', cb)  |  EventBus.emit('evento', datos)

const EventBus = (() => {
  const listeners = {};

  const on   = (event, cb) => { /* TODO: registrar cb en listeners[event] */ };
  const off  = (event, cb) => { /* TODO: eliminar cb de listeners[event] */ };
  const emit = (event, data) => { /* TODO: ejecutar todos los cb de listeners[event] */ };
  const once = (event, cb) => { /* TODO: llamar on() y desuscribirse tras el primer disparo */ };

  return { on, off, emit, once };
})();

export default EventBus;
