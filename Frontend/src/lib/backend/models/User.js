// src/lib/backend/models/User.js
import db from '../../db'; 

class UserModel {
  // Mencari pengguna berdasarkan email
  static async findByEmail(email) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0]; 
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Database query failed for findByEmail');
    }
  }

  // Metode static untuk mencari user berdasarkan ID
  static async findById(id) { 
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Database query failed for findById');
    }
  }

  // Membuat pengguna baru
  static async createUser({ username, email, passwordHash, fullName = null, phoneNumber = null, role = 'user' }) {
    try {
      await db.execute(
        'INSERT INTO users (id, username, email, password_hash, full_name, phone_number, role) VALUES (UUID(), ?, ?, ?, ?, ?, ?)',
        [username, email, passwordHash, fullName, phoneNumber, role]
      );

      // Setelah insert, ambil data user yang baru dibuat 
      const newUser = await this.findByEmail(email);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      // Cek apakah error karena duplikat email/username
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email or username already exists');
      }
      throw new Error('Database insert failed for createUser');
    }
  }

  static async updatePasswordHash(userId, newPasswordHash) {
    try {
      const [result] = await db.execute(
        'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newPasswordHash, userId]
      );
      return result.affectedRows > 0; 
    } catch (error) {
      console.error('Error updating password hash in model:', error);
      throw new Error('Database update failed for password hash');
    }
  }

  static async updateProfile(userId, { fullName, phoneNumber, avatarUrl }) {
    try {
      const updates = [];
      const values = [];

      if (fullName !== undefined) {
        updates.push('full_name = ?');
        values.push(fullName);
      }
      if (phoneNumber !== undefined) {
        updates.push('phone_number = ?');
        values.push(phoneNumber);
      }
      if (avatarUrl !== undefined) {
        updates.push('avatar_url = ?');
        values.push(avatarUrl);
      }

      if (updates.length === 0) {
        return await this.findById(userId); 
      }

      const query = `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      values.push(userId);

      await db.execute(query, values);

      // Ambil dan kembalikan user yang diperbarui
      const updatedUser = await this.findById(userId);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Database update failed for updateProfile');
    }
  }

}

export default UserModel;