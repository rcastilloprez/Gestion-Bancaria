// src/pages/Transactions/TransactionsPage.js

import Table from "../../components/Table/Table.js";
import TransactionService from "../../services/transactionService.js";
import { formatDate } from "../../utils/formatter.js";
import { TRANSACTION_TYPES } from "../../../config/constants.js";
import AccountService from "../../services/accountService.js";
import Modal from "../../components/Modal/Modal.js";

const TransactionsPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Mis transacciones</h1>
          <button id="btn-new-transaction" class="btn btn--primary">+ Nueva Transaccion</button>
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

    container.querySelector('#btn-new-transaction').addEventListener('click', () => {
      TransactionsPage._openCreateModal(container);
    })


    container.querySelector('#accounts-deposit').addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if(!id) return;
      if(e.target.matches('.btn--delete')) TransactionsPage._deleteTransaction(id, container);
    });
    container.querySelector('#accounts-withdrawal').addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if(!id) return;
      if(e.target.matches('.btn--delete')) TransactionsPage._deleteTransaction(id, container);
    });
    container.querySelector('#accounts-transfer').addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if(!id) return;
      if(e.target.matches('.btn--delete')) TransactionsPage._deleteTransaction(id, container);
    });

  },



  _getBaseColumns() {
    return [
      { key: 'accountId', label: 'Cuenta de origen' },
      { key: 'amount', label: 'Monto' },
      { key: 'description', label: 'Descripción' },
      { key: 'date', label: 'Fecha', render: (v) => formatDate(v) },
      { key: 'actions', label: 'Acciones', render: (item) => `
        <button class="btn btn--danger btn--delete" data-id="${item.id}">Eliminar</button>
      `}
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
      { key: 'date', label: 'Fecha', render: (v) => formatDate(v) },
      { key: 'actions', label: 'Acciones', render: (item) => `
        <button class="btn btn--danger btn--delete" data-id="${item.id}">Eliminar</button>
      `}
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
  },

  _openCreateModal: async(container) => {

    const typeOptions = Object.entries(TRANSACTION_TYPES)
      .map(([_, label]) => `<option value="${label}">${label}</option>`)
      .join('');

    const accounts = await AccountService.getAll();
    console.log(accounts);
    const optionsAccount = accounts.map((t) => `<option value="${t}">${t.alias}</option>`).join('');


    Modal.open({
      title: 'Nueva transaccion',
      confirmText: 'Realizar Transaccion',
      content: `
        <form id="form-new-transaction" novalidate>
          <div class="field">
            <label>Elegir Cuenta:</label>
            <select name="account">
              <option value="">-- Selecciona la cuenta --</option>
              ${optionsAccount}
            </select>
          </div>
          <div class="field">
            <label>Accion a efectuar:</label>
            <select name="type">
              <option value="">-- Selecciona la accion --</option>
              ${typeOptions}
            </select>
          </div>
          <div class="field">
            <label>Valor:</label>
            <input name="valueTransaction" type="number" value="0" min="0" />
          </div>
        </form>
      
      
      `,

    });


  },


  _deleteTransaction: async (id, container) => {
    if(!confirm('Eliminar esta transaccion? Esta transaccion no se puede deshacer.')) return;
    try {
      await TransactionService.deleteById(id);
      await TransactionsPage._loadTransactions(container);
    } catch (error) {
      alert(`No se pudo eliminar la cuenta: ${error.message}`);
    }
  
  }
};

export default TransactionsPage;
