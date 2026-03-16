// src/components/Table/Table.js — tabla dinámica reutilizable

const Table = (() => {
  const render = (container, { columns, data, emptyMessage = 'Sin datos.' }) => {
    if (!data || data.length === 0) {
      container.innerHTML = `<p class="table__empty">${emptyMessage}</p>`;
      return;
    }

    const headers = columns
      .map((col) => `<th class="table__th">${col.label}</th>`)
      .join('');

    const rows = data
      .map((item) => {
        const cells = columns
          .map((col) => {
            if (col.key === 'actions') {
              const buttons = col.render ? col.render(item) : '';
              return `<td class="table__td table__td--actions">${buttons}</td>`;
            }
            const value = item[col.key];
            const display = col.render ? col.render(value, item) : (value ?? '—');
            return `<td class="table__td">${display}</td>`;
          })
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    container.innerHTML = `
      <div class="table-wrapper">
        <table class="table">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  };

  return { render };
})();

export default Table;
