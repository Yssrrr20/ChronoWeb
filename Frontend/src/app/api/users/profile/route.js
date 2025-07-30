// src/app/api/users/profile/route.js
import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/backend/middlewares/authMiddleware'; 
import UserModel from '@/lib/backend/models/User'; 
import UserService from '@/lib/backend/services/userService'; 

// Route Handler untuk memperbarui profil pengguna
export async function PUT(request) { 
  // 1. Otentikasi Pengguna
  const authResult = await authenticate(request);
  if (authResult instanceof NextResponse) {
    return authResult; 
  }
  const { user: authenticatedUser } = authResult; 
  const userId = authenticatedUser.id; 

  try {
    // 2. Ambil data update dari body request
    const updateData = await request.json();

    // 3. Panggil UserService untuk melakukan update
    const updatedUser = await UserService.updateUserProfile(userId, updateData);

    // Hapus password_hash sebelum mengirim ke frontend
    const { password_hash, ...userProfile } = updatedUser;

    return NextResponse.json({
      message: 'Profile updated successfully!',
      user: userProfile
    }, { status: 200 });

  } catch (error) {
    console.error('API /api/users/profile PUT Error:', error);
    if (error.message.includes('required') || error.message.includes('invalid')) {
      return NextResponse.json({ message: error.message }, { status: 400 }); 
    }
    return NextResponse.json(
      { message: 'Internal server error while updating profile.', details: error.message },
      { status: 500 }
    );
  }
}