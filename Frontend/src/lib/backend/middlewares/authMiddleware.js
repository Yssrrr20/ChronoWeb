// src/lib/backend/middlewares/authMiddleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from '../../utils/jwtUtils'; 

/**
 * Middleware untuk memverifikasi JWT dari header Authorization.
 * Menambahkan `user` object ke request jika token valid.
 * Mengembalikan respons error jika token tidak ada atau tidak valid.
 *
 * @param {Request} request - Objek Request Next.js
 * @returns {Promise<{ user: Object }|NextResponse>} Objek user jika berhasil, atau NextResponse error jika gagal.
 */

export async function authenticate(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Authentication required: No token provided or malformed.' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1]; 

  // Verifikasi token
  const decodedToken = verifyToken(token); 
  if (!decodedToken) {
    return NextResponse.json(
      { message: 'Invalid or expired token.' },
      { status: 401 }
    );
  }
  return { user: decodedToken };
}
