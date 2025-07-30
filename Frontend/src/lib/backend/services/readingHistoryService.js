// src/lib/backend/services/readingHistoryService.js
import ReadingHistory from '@/lib/backend/models/ReadingHistory';

class ReadingHistoryService {
  static async addReadingHistory(userId, article) {
    return await ReadingHistory.add(userId, article);
  }

  static async getReadingHistory(userId, limit, offset) {
    return await ReadingHistory.getByUserId(userId, limit, offset);
  }
}

export default ReadingHistoryService;