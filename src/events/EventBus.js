// src/events/EventBus.js — comunicación desacoplada entre módulos (pub/sub)
// Uso: EventBus.on('evento', cb)  |  EventBus.emit('evento', datos)

const EventBus = (() => {
  const listeners = {};

  const on = (event, cb) => {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(cb);
    console.log('[EventBus] on →', event, '| total listeners:', listeners[event].length, '| todos:', listeners);
  };

  const off = (event, cb) => {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter((fn) => fn !== cb);
  };

  const emit = (event, data) => {
    console.log('[EventBus] emit →', event, '| data:', data, '| listeners activos:', listeners[event]?.length ?? 0);
    if (!listeners[event]) return;
    listeners[event].forEach((cb) => cb(data));
  };

  const once = (event, cb) => {
    const wrapper = (data) => {
      cb(data);
      off(event, wrapper);
    };
    on(event, wrapper);
  };
  return { on, off, emit, once };
})();

export default EventBus;
