// src/app/api/articles/route.js
import { NextResponse } from 'next/server';
import GuardianNewsService from '@/lib/backend/services/guardianNewsService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const section = searchParams.get('section');
    const pageSize = parseInt(searchParams.get('pageSize') || '3', 10); 
    const fromDate = searchParams.get('from-date');
    const toDate = searchParams.get('to-date');

    const articles = await GuardianNewsService.fetchArticles({
      query: query, 
      section: section || '',
      pageSize: pageSize,
      fromDate: fromDate,
      toDate: toDate,
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error('API /api/articles GET Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error fetching articles.' },
      { status: 500 }
    );
  }
}