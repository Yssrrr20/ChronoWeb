// src/lib/backend/services/bookmarkService.js
import Bookmark from '@/lib/backend/models/Bookmark';

class BookmarkService {
  static async addBookmark(userId, articleData) {
    return await Bookmark.add(userId, articleData);
  }

  static async removeBookmark(userId, articleId) {
    return await Bookmark.remove(userId, articleId);
  }

  static async getUserBookmarks(userId) {
    return await Bookmark.getByUserId(userId);
  }

  static async checkBookmarkStatus(userId, articleId) {
    return await Bookmark.isBookmarked(userId, articleId);
  }
}

export default BookmarkService;