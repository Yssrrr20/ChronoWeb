// src/app/api/upload-avatar/route.js
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/backend/config/cloudinaryConfig';
import UserModel from '@/lib/backend/models/User';
import { authenticate } from '@/lib/backend/middlewares/authMiddleware';

export async function POST(request) {
  // 1. Otentikasi Pengguna
  const authResult = await authenticate(request);
  if (authResult instanceof NextResponse) {
    return authResult; 
  }
  const { user: authenticatedUser } = authResult;
  const userId = authenticatedUser.id; // Dapatkan ID user dari token

  try {
    // 2. Menggunakan request.formData() untuk parsing file
    const formData = await request.formData();
    const avatarFile = formData.get('avatar'); 

    if (!avatarFile || !(avatarFile instanceof File)) {
      return NextResponse.json({ message: 'No avatar file provided or invalid type.' }, { status: 400 });
    }

    // Mengubah File menjadi Buffer
    const bytes = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Validasi File 
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    if (avatarFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: 'File size exceeds 5MB limit.' }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.includes(avatarFile.type)) {
      return NextResponse.json({ message: 'Only JPG, PNG, WEBP images are allowed.' }, { status: 400 });
    }

    // 4. Unggah File ke Cloudinary menggunakan Data URI
    const fileBase64 = `data:${avatarFile.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: 'chrononews_avatars', 
      public_id: `user-${userId}-${Date.now()}`, 
      overwrite: true, 
      resource_type: 'image',
      quality: 'auto:low' 
    });

    const newAvatarUrl = result.secure_url; 

    // 5. Update URL Avatar di Database
    await UserModel.updateProfile(userId, { avatarUrl: newAvatarUrl });

    // 6. Kirim Respons Sukses
    return NextResponse.json({
      message: 'Avatar uploaded successfully!',
      avatarUrl: newAvatarUrl,
    }, { status: 200 });

  } catch (error) {
    console.error('API Upload Avatar Error:', error);
    return NextResponse.json(
      { message: 'Internal server error during avatar upload.', details: error.message },
      { status: 500 }
    );
  }
}