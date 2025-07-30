// src/lib/backend/services/userService.js
import UserModel from '../models/User';
import { hashPassword, comparePassword } from '../../utils/passwordUtils';

class UserService {
  static async updateUserProfile(userId, updateData) {
    const {
      full_name,
      phone_number,
      email_notifications, 
      push_notifications,  
      newsletter_subscription 
    } = updateData;

    

    const updatedUser = await UserModel.updateProfile(userId, {
      fullName: full_name,
      phoneNumber: phone_number,
      emailNotifications: email_notifications, 
      pushNotifications: push_notifications,   
      newsletterSubscription: newsletter_subscription
    });

    if (!updatedUser) {
      throw new Error('User not found or update failed.');
    }

    return updatedUser;
  }

  static async changeUserPassword(userId, oldPassword, newPassword) {
    // 1. Ambil user dari database untuk mendapatkan hash password lama
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found.'); 
    }

    // 2. Bandingkan password lama yang diberikan dengan hash di database
    const isOldPasswordValid = await comparePassword(oldPassword, user.password_hash);
    if (!isOldPasswordValid) {
      throw new Error('Old password is incorrect.');
    }

    // 3. Hash password baru
    const newPasswordHashed = await hashPassword(newPassword);

    // 4. Perbarui password hash di database
    const updated = await UserModel.updatePasswordHash(userId, newPasswordHashed);
    if (!updated) {
      throw new Error('Failed to update password in database.');
    }

    return { message: 'Password updated successfully.' };
  }
}

export default UserService;