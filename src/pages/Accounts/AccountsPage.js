// src/pages/Accounts/AccountsPage.js

import AccountService      from '../../services/accountService.js';
import Table               from '../../components/Table/Table.js';
import Modal               from '../../components/Modal/Modal.js';
import { formatCurrency }  from '../../utils/formatter.js';
import { required, validate } from '../../utils/validator.js';
import { ACCOUNT_TYPES }   from '../../../config/constants.js';

const AccountsPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Mis Cuentas</h1>
          <button id="btn-new-account" class="btn btn--primary">+ Nueva Cuenta</button>
        </div>
        <div id="accounts-table"></div>
      </section>
    `;

    await AccountsPage._loadAccounts(container);

    container.querySelector('#btn-new-account').addEventListener('click', () => {
      AccountsPage._openCreateModal(container);
    });
  },

  _loadAccounts: async (container) => {
    const tableContainer = container.querySelector('#accounts-table');
    tableContainer.innerHTML = '<p class="loading">Cargando...</p>';

    try {
      const accounts = await AccountService.getAll();
      Table.render(tableContainer, {
        columns: [
          { key: 'alias',   label: 'Nombre' },
          { key: 'type',    label: 'Tipo' },
          { key: 'balance', label: 'Saldo', render: (v) => formatCurrency(v) },
        ],
        data: accounts,
        emptyMessage: 'No tienes cuentas aún. ¡Crea la primera!',
      });
    } catch (error) {
      tableContainer.innerHTML = `<p class="error">Error al cargar cuentas: ${error.message}</p>`;
    }
  },

  _openCreateModal: (container) => {
    const typeOptions = ACCOUNT_TYPES
      .map((t) => `<option value="${t}">${t}</option>`)
      .join('');

    Modal.open({
      title: 'Nueva Cuenta',
      confirmText: 'Crear Cuenta',
      content: `
        <form id="form-new-account" novalidate>
          <div class="field">
            <label>Nombre / Alias *</label>
            <input name="alias" type="text" placeholder="Ej: Mi cuenta de ahorro" />
            <span class="field__error" id="error-alias"></span>
          </div>
          <div class="field">
            <label>Tipo *</label>
            <select name="type">
              <option value="">-- Selecciona --</option>
              ${typeOptions}
            </select>
            <span class="field__error" id="error-type"></span>
          </div>
          <div class="field">
            <label>Saldo inicial</label>
            <input name="balance" type="number" value="0" min="0" />
          </div>
        </form>
      `,
      onConfirm: async (modalBody) => {
        const form   = modalBody.querySelector('#form-new-account');
        const data   = Object.fromEntries(new FormData(form));
        data.balance = Number(data.balance) || 0;

        const aliasError = validate(data.alias, [required]);
        const typeError  = validate(data.type,  [required]);

        form.querySelector('#error-alias').textContent = aliasError || '';
        form.querySelector('#error-type').textContent  = typeError  || '';

        if (aliasError || typeError) return; // no cierra el modal

        try {
          await AccountService.create(data);
          Modal.close();
          await AccountsPage._loadAccounts(container);
        } catch (error) {
          alert(`No se pudo crear la cuenta: ${error.message}`);
        }
      },
    });
  },
};

export default AccountsPage;
