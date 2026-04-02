// src/pages/Transactions/TransactionsPage.js

import Table from "../../components/Table/Table.js";
import TransactionService from "../../services/transactionService.js";
import { formatDate } from "../../utils/formatter.js";
import { TRANSACTION_TYPES } from "../../../config/constants.js";

const TransactionsPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Mis transacciones</h1>
        </div>
        <div class="transactions-section">
          <h2>Depósitos</h2>
          <div id="accounts-deposit"></div>
        </div>
        <div class="transactions-section">
          <h2>Retiros</h2>
          <div id="accounts-withdrawal"></div>
        </div>
        <div class="transactions-section">
          <h2>Transferencias</h2>
          <div id="accounts-transfer"></div>
        </div>
      </section>
    `;

    await TransactionsPage._loadTransactions(container);
  },

  _getBaseColumns() {
    return [
      { key: 'accountId', label: 'Cuenta de origen' },
      { key: 'amount', label: 'Monto' },
      { key: 'description', label: 'Descripción' },
      { key: 'date', label: 'Fecha', render: (v) => formatDate(v) }
    ];
  },

  _getTransferColumns() {
    return [
      { key: 'accountId', label: 'Cuenta de origen' },
      {
        key: 'toAccountId',
        label: 'Cuenta destino',
        render: (value) => value ?? '—'
      },
      { key: 'amount', label: 'Monto' },
      { key: 'description', label: 'Descripción' },
      { key: 'date', label: 'Fecha', render: (v) => formatDate(v) }
    ];
  },

  _showLoadingState(containers) {
    containers.forEach(container => {
      if (container) {
        container.innerHTML = '<p class="loading">Cargando...</p>';
      }
    });
  },

  _showErrorState(containers, errorMessage) {
    containers.forEach(container => {
      if (container) {
        container.innerHTML = `<p class="error">Error al cargar transacciones: ${errorMessage}</p>`;
      }
    });
  },

  _loadTransactions: async (container) => {
    const tableDeposit = container.querySelector("#accounts-deposit");
    const tableWithdrawal = container.querySelector("#accounts-withdrawal");
    const tableTransfer = container.querySelector("#accounts-transfer");

    const containers = [tableDeposit, tableWithdrawal, tableTransfer];
    TransactionsPage._showLoadingState(containers);

    try {
      const transactions = await TransactionService.getAll();

      Table.render(tableDeposit, {
        columns: TransactionsPage._getBaseColumns(),
        data: transactions.filter((data) => data.type === TRANSACTION_TYPES.DEPOSIT),
        emptyMessage: 'No tienes ningún depósito realizado por el momento'
      });

      Table.render(tableWithdrawal, {
        columns: TransactionsPage._getBaseColumns(),
        data: transactions.filter((data) => data.type === TRANSACTION_TYPES.WITHDRAWAL),
        emptyMessage: 'No tienes ningún retiro realizado por el momento'
      });

      Table.render(tableTransfer, {
        columns: TransactionsPage._getTransferColumns(),
        data: transactions.filter((data) => data.type === TRANSACTION_TYPES.TRANSFER),
        emptyMessage: 'No tienes ninguna transferencia realizada por el momento'
      });

    } catch (error) {
      console.error('Error al cargar transacciones:', error);
      TransactionsPage._showErrorState(containers, error.message);
    }
  }
};

export default TransactionsPage;
