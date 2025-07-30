// src/app/api/test-db/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // <-- Ini adalah import yang benar!
                           // Alias `@/` akan diterjemahkan ke `src/`
                           // sehingga path lengkapnya menjadi `src/lib/db.js`

export async function GET() {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1 + 1 AS solution');
    connection.release();

    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to MySQL database from API Route!',
      // solution: rows[0].solution // Tidak perlu baris ini untuk tes sederhana
    }, { status: 200 });

  } catch (error) {
    console.error('Database connection test failed in API Route:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to MySQL database from API Route.',
      details: error.message
    }, { status: 500 });
  }
}