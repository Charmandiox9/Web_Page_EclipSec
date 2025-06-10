// LOGIN + Mostrar/Ocultar enlaces según el estado de sesión
document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('formLogin');
  const cerrarSesion = document.getElementById('cerrarSesion');
  const linkLogin = document.getElementById('link-login');
  const linkRegistro = document.getElementById('link-registro');

  const token = localStorage.getItem("token");

  // Ocultar enlaces si ya hay sesión iniciada
  if (token) {
    if (linkLogin) linkLogin.style.display = "none";
    if (linkRegistro) linkRegistro.style.display = "none";
    if (cerrarSesion) cerrarSesion.style.display = "inline";
  } else {
    if (cerrarSesion) cerrarSesion.style.display = "none";
  }

  // Manejador del formulario de login
  if (formLogin) {
    formLogin.addEventListener('submit', async e => {
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(e.target));

      try {
        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        const json = await res.json();

        if (res.ok) {
          localStorage.setItem("token", json.token);
          alert("Sesión iniciada");
          window.location.href = "index.html";
        } else {
          alert("Login fallido: " + (json.message || res.statusText));
        }
      } catch (error) {
        alert("Error de conexión: " + error.message);
      }
    });
  }

  // Cerrar sesión
  if (cerrarSesion) {
    cerrarSesion.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("token");
      alert("Sesión cerrada");
      window.location.href = "index.html";
    });
  }
});

