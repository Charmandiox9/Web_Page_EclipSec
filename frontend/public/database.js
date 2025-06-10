// frontend/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'postgres', // 'postgres' para docker-compose, 'localhost' para local
  database: process.env.DB_NAME || 'ciberseguridad', // Corregido: debe coincidir con docker-compose
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Conexión a PostgreSQL exitosa');
    client.release();
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
  }
};

// Probar conexión al iniciar
testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
};