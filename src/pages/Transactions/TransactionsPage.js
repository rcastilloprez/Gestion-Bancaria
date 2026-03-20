// src/pages/Transactions/TransactionsPage.js

const TransactionsPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Mis transacciones</h1>
        </div>
      </section>
    `;
  },
};

export default TransactionsPage;
