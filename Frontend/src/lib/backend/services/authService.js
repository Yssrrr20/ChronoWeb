// src/lib/backend/services/authService.js
import UserModel from '../models/User';
import { hashPassword, comparePassword } from '../../utils/passwordUtils';
import { generateToken } from '../../utils/jwtUtils'; 

class AuthService {
  static async registerUser(userData) {
    const { username, email, password, fullName, phoneNumber } = userData;

    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required.');
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered.');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.createUser({
      username,
      email,
      passwordHash: hashedPassword,
      fullName,
      phoneNumber,
      role: 'user',
    });

    const { password_hash, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  }

  static async loginUser(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials.');
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials.');
    }

    // <-- BAGIAN BARU: Buat JWT
    const token = generateToken({ id: user.id, email: user.email, role: user.role, username: user.username });

    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token }; // <-- Sekarang mengembalikan user DAN token
  }
}

export default AuthService;