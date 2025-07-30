// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import AuthService from '@/lib/backend/services/authService';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // AuthService sekarang mengembalikan user DAN token
    const { user, token } = await AuthService.loginUser(email, password);

    // Kirim token ke frontend.
    return NextResponse.json(
      { message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, role: user.role }, token },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Login Error:', error);

    if (error.message.includes('Invalid credentials') || error.message.includes('required')) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error during login.' },
      { status: 500 }
    );
  }
}