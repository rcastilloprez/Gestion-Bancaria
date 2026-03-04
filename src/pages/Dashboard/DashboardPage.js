// src/pages/Dashboard/DashboardPage.js

const DashboardPage = {
  render: async (container) => {
    container.innerHTML = `
      <section class="page">
        <div class="page__header">
          <h1>Dashboard</h1>
        </div>
        <p>Bienvenido. Usa el menú para navegar a Cuentas o Transacciones.</p>
      </section>
    `;
  },
};

export default DashboardPage;
