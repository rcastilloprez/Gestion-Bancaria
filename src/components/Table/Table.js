// src/components/Table/Table.js — tabla dinámica reutilizable
// Uso:
//   Table.render(container, {
//     columns: [{ key: 'date', label: 'Fecha', render: (v) => formatDate(v) }],
//     data: [...],
//     emptyMessage: 'Sin datos',
//   });

const Table = (() => {
  const render = (container, { columns, data, emptyMessage = 'Sin datos.' }) => {
    // TODO: si data está vacía mostrar emptyMessage
    // TODO: construir <table> con <thead> desde columns y <tbody> desde data
    // TODO: si la columna tiene render(), usarlo para mostrar el valor
  };

  return { render };
})();

export default Table;
