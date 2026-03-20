// src/pages/Transactions/TransactionsPage.js

import Table from "../../components/Table/Table.js";
import TransactionService from "../../services/transactionService.js";
import { formatDate } from "../../utils/formatter.js";

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

    await TransactionsPage._loadTransactions(container);
  },


  _loadTransactions: async(container) => {
    const tableContainer = container.querySelector("#accounts-table");
    tableContainer.innerHTML = '<p class="loading">...cargando</p>';

    try {
      const transactions = await TransactionService.getAll();

      Table.render(tableContainer, {
        columns: [
          {key: 'accountId', label: 'Cuenta de origen'},
          {
            key: 'toAccountId', 
            label: 'Cuenta destino',
            render: (value, item) => {
              // Solo mostrar si es transferencia
              return item.type === 'transferencia' ? (value ?? '—') : '—';
            }
          },
          {key: 'type', label: 'Tipo de transaccion'},
          {key: 'amount', label: 'Monto'},
          {key: 'description', label: 'Descripcion'},
          {key: 'date', label: 'Fecha', render: (v) => formatDate(v)},

        ],
        data: transactions,
        emptyMessage: 'No tienes ninguna tranferencia por el momento',
      })

    } catch (error) {
      tableContainer.innerHTML = `<p class="error">Error al cargar cuentas: ${error.message}</p>`
    }


  }


};

export default TransactionsPage;
