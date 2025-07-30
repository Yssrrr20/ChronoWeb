// src/app/api/change-password/route.js
import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/backend/middlewares/authMiddleware';
import UserService from '@/lib/backend/services/userService';

export async function POST(request) { // Menggunakan POST untuk perubahan data
  // 1. Otentikasi Pengguna
  const authResult = await authenticate(request);
  if (authResult instanceof NextResponse) {
    return authResult; 
  }
  const { user: authenticatedUser } = authResult;
  const userId = authenticatedUser.id; 

  try {
    const { oldPassword, newPassword } = await request.json();

    // Validasi input
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Old password and new password are required.' },
        { status: 400 }
      );
    }
    if (newPassword.length < 6) { 
      return NextResponse.json(
        { message: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Panggil UserService untuk mengubah password
    await UserService.changeUserPassword(userId, oldPassword, newPassword);

    return NextResponse.json({ message: 'Password changed successfully.' }, { status: 200 });

  } catch (error) {
    console.error('API /api/change-password POST Error:', error);

    if (error.message.includes('Old password is incorrect')) {
      return NextResponse.json({ message: error.message }, { status: 401 }); 
    }
    if (error.message.includes('required') || error.message.includes('characters')) {
        return NextResponse.json({ message: error.message }, { status: 400 }); 
    }

    return NextResponse.json(
      { message: 'Internal server error during password change.' },
      { status: 500 }
    );
  }
}