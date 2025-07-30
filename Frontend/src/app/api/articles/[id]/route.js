// src/app/api/articles/[id]/route.js
import { NextResponse } from 'next/server';
import GuardianNewsService from '@/lib/backend/services/guardianNewsService';



export async function GET(request, { params }) {
  const articleId = params.id; // Mendapatkan ID artikel dari URL
  if (!articleId) {
    return NextResponse.json({ message: 'Article ID is required.' }, { status: 400 });
  }

  try {
    
    const article = await GuardianNewsService.fetchArticleById(articleId);

    if (!article) {
      return NextResponse.json({ message: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error('API /api/articles/[id] GET Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error fetching article details.' },
      { status: 500 }
    );
  }
}