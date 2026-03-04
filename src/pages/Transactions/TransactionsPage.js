// src/pages/Transactions/TransactionsPage.js

const TransactionsPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Transacciones</h1>
        </div>
        <p>Próximamente: listado de transacciones por cuenta.</p>
      </section>
    `;
  },
};

export default TransactionsPage;
