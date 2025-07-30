// src/app/api/bookmarks/route.js
import { NextResponse } from 'next/server';
import BookmarkService from '@/lib/backend/services/bookmarkService';
import { authenticate } from '@/lib/backend/middlewares/authMiddleware'; 

// GET: Mendapatkan semua bookmark untuk user yang terautentikasi
export async function GET(request) {
  try {
    const authResult = await authenticate(request); 
    if (authResult instanceof NextResponse) { 
      return authResult; 
    }
    const userId = authResult.user.id; 

    const bookmarks = await BookmarkService.getUserBookmarks(userId);
    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (error) {
    console.error('API /api/bookmarks GET Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error fetching bookmarks.' },
      { status: 500 }
    );
  }
}

// POST: Menambahkan bookmark baru
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

    const bookmarkId = await BookmarkService.addBookmark(userId, article);

    if (bookmarkId === null) {
      return NextResponse.json({ message: 'Article already bookmarked.' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Article bookmarked successfully.', bookmarkId }, { status: 201 });
  } catch (error) {
    console.error('API /api/bookmarks POST Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error adding bookmark.' },
      { status: 500 }
    );
  }
}

// DELETE: Menghapus bookmark
export async function DELETE(request) {
  try {
    const authResult = await authenticate(request); 
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const userId = authResult.user.id;

    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json({ message: 'Missing article ID.' }, { status: 400 });
    }

    const success = await BookmarkService.removeBookmark(userId, articleId);

    if (!success) {
      return NextResponse.json({ message: 'Bookmark not found or already removed.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bookmark removed successfully.' }, { status: 200 });
  } catch (error) {
    console.error('API /api/bookmarks DELETE Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error removing bookmark.' },
      { status: 500 }
    );
  }
}