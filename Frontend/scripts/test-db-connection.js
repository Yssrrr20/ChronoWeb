// Frontend/scripts/test-db-connection.js
const mysql = require('mysql2/promise');

async function testDbConnection() {
    const pool = mysql.createPool({
    host: 'localhost',           // <-- Host MySQL Anda
    user: 'root',                // <-- User MySQL Anda
    password: '',                // <-- Kosongkan jika tidak ada password
    database: 'chrononews_db',   // <-- Nama database Anda
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT "Database connected successfully!" AS message');
    console.log(rows[0].message);
    connection.release();
    console.log('Connection released back to pool.');
  } catch (error) {
    console.error('Failed to connect to database:', error.message);
    console.error('Please check your .env file and MySQL server status.');
  } finally {
    await pool.end(); // Penting: tutup pool setelah pengujian
  }
}

testDbConnection();