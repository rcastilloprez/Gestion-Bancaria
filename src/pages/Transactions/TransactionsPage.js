// src/pages/Transactions/TransactionsPage.js

import Table from "../../components/Table/Table";
import TransactionService from "../../services/transactionService";

const TransactionsPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Mis transacciones</h1>
        </div>
        <div id="accounts-table"></div>
      </section>
    `;
  },


  _loadTransactions: async(container) => {
    const tableContainer = container.querySelector("#accounts-table");
    tableContainer.innerHTML = '<p class="loading">...cargando</p>';

    try {
      const transactions = await TransactionService.getAll();

      Table.render(tableContainer, {
        columns: [
          {key: 'accountId', label: ''},
          {key: '', label: ''},
          {key: '', label: ''},
          {key: '', label: ''},

        ]
      })

    } catch (error) {
      tableContainer.innerHTML = `<p class="error">Error al cargar cuentas: ${error.message}</p>`
    }


  }


};

export default TransactionsPage;
