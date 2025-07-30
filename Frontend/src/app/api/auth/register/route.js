// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import AuthService from '@/lib/backend/services/authService'; 

export async function POST(request) {
  try {
    const userData = await request.json(); 
    const { user } = await AuthService.registerUser(userData);

    // Jika berhasil, kirim respons sukses
    return NextResponse.json(
      { message: 'Registration successful', user: { id: user.id, username: user.username, email: user.email } },
      { status: 201 } 
    );
  } catch (error) {
    console.error('API Register Error:', error);

    if (error.message.includes('Email or username already exists')) {
      return NextResponse.json(
        { message: error.message },
        { status: 409 } 
      );
    }
    if (error.message.includes('required')) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 } 
      );
    }

    // Tangani error umum lainnya
    return NextResponse.json(
      { message: 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}