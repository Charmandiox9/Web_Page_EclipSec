document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('servicios-container');

  contenedor.innerHTML = '<p style="text-align:center; width:100%;">Cargando servicios...</p>';

  try {
    const response = await fetch('/api/servicios');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const servicios = await response.json();
    contenedor.innerHTML = '';

    if (servicios.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center; width:100%;">No hay servicios disponibles.</p>';
      return;
    }

    servicios.forEach(servicio => {
      const div = document.createElement('div');
      div.className = 'service-card';
      div.innerHTML = `
        <h3>${servicio.nombre}</h3>
        <p>${servicio.descripcion}</p>
        <strong>Precios desde: $${servicio.precio}</strong>
        <a href="contratar.html" class="btn-contratar">Contratar</a>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    contenedor.innerHTML = '<p style="text-align:center; width:100%;">Error al cargar los servicios. Por favor, intente nuevamente.</p>';
    console.error('Error al cargar servicios:', error);
  }
});
