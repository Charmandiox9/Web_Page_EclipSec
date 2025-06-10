document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const select = document.getElementById("servicioSelect");

  try {
    const res = await fetch("http://localhost:8080/servicios", {
      headers: { "Authorization": "Bearer " + token }
    });

    if (!res.ok) throw new Error("Error al cargar servicios");

    const servicios = await res.json();
    servicios.forEach(servicio => {
      const option = document.createElement("option");
      option.value = servicio.id;
      option.textContent = `${servicio.nombre} - $${servicio.precio}`;
      select.appendChild(option);
    });
  } catch (err) {
    alert("No se pudieron cargar los servicios");
    console.error(err);
  }
});

document.getElementById("formContratar").addEventListener("submit", async e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  datos.servicio_id = parseInt(datos.servicio_id);  // 👈 importante
  const token = localStorage.getItem("token");

  console.log("Datos a enviar:", datos);

  const res = await fetch("http://localhost:8080/contratar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(datos)
  });

  if (res.ok) {
    alert("Servicio contratado con éxito");
  } else {
    alert("Error al contratar");
  }
});
