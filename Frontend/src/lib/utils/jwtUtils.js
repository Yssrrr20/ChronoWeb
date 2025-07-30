// src/lib/utils/jwtUtils.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_please_change_me_in_env';
const TOKEN_EXPIRATION = '1d';

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Mengembalikan payload yang telah didekode
  } catch (error) {
    // Jika token tidak valid (kadaluwarsa, signature salah, dll.)
    console.error('JWT verification failed:', error.message);
    return null;
  }
}