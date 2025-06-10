const express = require("express");
const path = require("path");
const app = express();

const { Pool } = require('pg');

// Conexión al contenedor de PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas principales
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/servicios", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "servicios.html"));
});

// API endpoint para servicios (temporal sin BD)
app.get("/api/servicios", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios');
    res.json(result.rows);
  } catch (err) {
    console.error("Error al consultar servicios:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Frontend corriendo en http://localhost:' + PORT);
  console.log('Página de servicios disponible en: http://localhost:/servicios');
});