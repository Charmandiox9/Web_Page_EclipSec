const express = require("express");
const path = require("path");
const db = require("./database"); // Conexión a la base de datos
const app = express();

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// ==== RUTAS HTML ====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/servicios", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "servicios.html"));
});

app.get("/contratar", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contratar.html"));
});

app.get("/quienes_somos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "quienes_somos.html"));
});

app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contacto.html"));
});

// ==== API SERVICIOS ====
app.get("/api/servicios", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM servicios ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ==== RUTA POST PARA LOGIN (opcional, si usas formulario de login) ====
app.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM usuarios WHERE correo = $1 AND password = $2",
      [correo, password]
    );

    if (result.rows.length > 0) {
      // Aquí podrías implementar sesiones o JWT
      res.json({ ok: true, mensaje: "Login exitoso" });
    } else {
      res.status(401).json({ ok: false, mensaje: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ==== RUTA 404 ====
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// ==== PUERTO DE ESCUCHA ====
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
