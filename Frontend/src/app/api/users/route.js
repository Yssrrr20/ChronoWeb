// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/backend/middlewares/authMiddleware';
import UserModel from '@/lib/backend/models/User';  // Impor model user

// Endpoint GET untuk mendapatkan data profil pengguna yang sedang login
export async function GET(request) {
  // Panggil middleware otentikasi
  const authResult = await authenticate(request);

  if (authResult instanceof NextResponse) {
    return authResult; 
  }

  const { user: authenticatedUser } = authResult; 

  try {
    const userFromDb = await UserModel.findById(authenticatedUser.id);

    if (!userFromDb) {
      return NextResponse.json({ message: 'User not found in database.' }, { status: 404 });
    }

    // Hapus password_hash sebelum mengirim ke frontend
    const { password_hash, ...userProfile } = userFromDb;

    return NextResponse.json({
      message: 'User profile retrieved successfully',
      user: userProfile
    }, { status: 200 });

  } catch (error) {
    console.error('API /api/users/me Error:', error);
    return NextResponse.json(
      { message: 'Internal server error while fetching profile.' },
      { status: 500 }
    );
  }
}