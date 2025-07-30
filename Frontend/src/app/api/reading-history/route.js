// src/app/api/reading-history/route.js
import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/backend/middlewares/authMiddleware';
import ReadingHistoryService from '@/lib/backend/services/readingHistoryService';

// POST: Menambahkan atau mengupdate riwayat bacaan
export async function POST(request) {
  try {
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) {
      return authResult; 
    }
    const userId = authResult.user.id;

    const { article } = await request.json(); 

    if (!article || !article.id || !article.title || !article.url) {
      return NextResponse.json({ message: 'Missing article data.' }, { status: 400 });
    }

    await ReadingHistoryService.addReadingHistory(userId, article);

    return NextResponse.json({ message: 'Reading history updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('API /api/reading-history POST Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error updating reading history.' },
      { status: 500 }
    );
  }
}

// GET: Mengambil riwayat bacaan untuk user
export async function GET(request) {
  try {
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const userId = authResult.user.id;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const history = await ReadingHistoryService.getReadingHistory(userId, limit, offset);

    return NextResponse.json({ history }, { status: 200 });
  } catch (error) {
    console.error('API /api/reading-history GET Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error fetching reading history.' },
      { status: 500 }
    );
  }
}