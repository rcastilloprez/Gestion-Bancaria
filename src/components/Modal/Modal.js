// src/components/Modal/Modal.js — diálogo reutilizable
// Requiere en index.html el bloque #modal-overlay

const Modal = (() => {
  const _overlay  = () => document.getElementById('modal-overlay');
  const _title    = () => document.querySelector('.modal__title');
  const _body     = () => document.querySelector('.modal__body');
  const _confirm  = () => document.querySelector('.modal__confirm');
  const _cancel   = () => document.querySelector('.modal__cancel');
  const _closeBtn = () => document.querySelector('.modal__close');

  const open = ({ title, content, onConfirm, confirmText = 'Confirmar' }) => {
    _title().textContent    = title;
    _body().innerHTML       = content;
    _confirm().textContent  = confirmText;

    // Reemplazar botón confirmar para limpiar listeners anteriores
    const oldBtn = _confirm();
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', async () => {
      if (onConfirm) await onConfirm(_body());
    });

    _cancel().onclick   = () => close();
    _closeBtn().onclick = () => close();
    _overlay().onclick  = (e) => { if (e.target === _overlay()) close(); };

    _overlay().classList.remove('hidden');
  };

  const close = () => {
    _overlay().classList.add('hidden');
    _body().innerHTML = '';
  };

  return { open, close };
})();

export default Modal;
