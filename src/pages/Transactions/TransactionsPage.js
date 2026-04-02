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
        <h2>Depositos</h2>
        <div id="accounts-deposit"></div>
        <br/>
        <h2>Retiros</h2>
        <div id="accounts-withdrawal"></div>
        <br/>
        <h2>Transferencias</h2>
        <div id="accounts-transfer"></div>
      </section>
    `;

    await TransactionsPage._loadTransactions(container);
  },


  _loadTransactions: async(container) => {
    const tableDeposit = container.querySelector("#accounts-deposit");
    const tableWithdrawal = container.querySelector("#accounts-withdrawal");
    const tableTransfer = container.querySelector("#accounts-transfer");
    tableDeposit.innerHTML = '<p class="loading">...cargando</p>';
    tableWithdrawal.innerHTML = '<p class="loading">...cargando</p>';
    tableTransfer.innerHTML = '<p class="loading">...cargando</p>';

    try {
      const transactions = await TransactionService.getAll();

      Table.render(tableDeposit, {
        columns: [
          {key: 'accountId', label: 'Cuenta de origen'},
          {key: 'amount', label: 'Monto'},
          {key: 'description', label: 'Descripcion'},
          {key: 'date', label: 'Fecha', render: (v) => formatDate(v)},

        ],
        data: transactions.filter((data) => data.type=="deposito"),
        emptyMessage: 'No tienes ningun deposito realizado por el momento',
      });

      Table.render(tableWithdrawal, {
        columns: [
          {key: 'accountId', label: 'Cuenta de origen'},
          {key: 'amount', label: 'Monto'},
          {key: 'description', label: 'Descripcion'},
          {key: 'date', label: 'Fecha', render: (v) => formatDate(v)},

        ],
        data: transactions.filter((data) => data.type=="retiro"),
        emptyMessage: 'No tienes ningun retiro realizado por el momento',
      });

      Table.render(tableTransfer, {
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
          {key: 'amount', label: 'Monto'},
          {key: 'description', label: 'Descripcion'},
          {key: 'date', label: 'Fecha', render: (v) => formatDate(v)},

        ],
        data: transactions.filter((data) => data.type=="transferencia"),
        emptyMessage: 'No tienes ninguna transferencia realizada por el momento',
      });

    } catch (error) {
      tableContainer.innerHTML = `<p class="error">Error al cargar cuentas: ${error.message}</p>`
    }


  }


};

export default TransactionsPage;
