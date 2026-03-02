// src/components/Modal/Modal.js — diálogo reutilizable
// Uso: Modal.open({ title, content, onConfirm })  |  Modal.close()

const Modal = (() => {
  const open  = ({ title, content, onConfirm }) => {
    // TODO: crear/mostrar overlay con título, contenido y botones Confirmar/Cancelar
    // TODO: botón Confirmar llama onConfirm() y luego close()
    // TODO: cerrar al hacer click fuera del modal
  };

  const close = () => {
    // TODO: ocultar overlay
  };

  return { open, close };
})();

export default Modal;
