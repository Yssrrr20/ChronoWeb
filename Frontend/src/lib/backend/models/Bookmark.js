// src/lib/backend/models/Bookmark.js
import db from '@/lib/db'; 

class Bookmark {
  // Menambahkan bookmark baru
  static async add(userId, article) {
    const { id, title, description, url, imageUrl, category, publishedAt, readTime, author } = article;
    try {
      const [result] = await db.execute(
        `INSERT INTO user_bookmarks (user_id, article_id, title, description, url, image_url, category, published_at, read_time, author)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, id, title, description, url, imageUrl, category, publishedAt, readTime, author]
      );
      return result.insertId; // Mengembalikan ID bookmark 
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.warn(`Article ${id} already bookmarked by user ${userId}.`);
        return null;
      }
      console.error('Error adding bookmark:', error);
      throw new Error('Failed to add bookmark.');
    }
  }

  // Menghapus bookmark
  static async remove(userId, articleId) {
    try {
      const [result] = await db.execute(
        `DELETE FROM user_bookmarks WHERE user_id = ? AND article_id = ?`,
        [userId, articleId]
      );
      return result.affectedRows > 0; 
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw new Error('Failed to remove bookmark.');
    }
  }

  // Mendapatkan semua bookmark untuk user tertentu
  static async getByUserId(userId) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM user_bookmarks WHERE user_id = ? ORDER BY bookmarked_at DESC`,
        [userId]
      );
      // Format ulang data 
      return rows.map(row => ({
        id: row.article_id, 
        title: row.title,
        description: row.description,
        url: row.url,
        imageUrl: row.image_url,
        category: row.category,
        publishedAt: row.published_at,
        readTime: row.read_time,
        author: row.author,
        bookmarkedAt: row.bookmarked_at, 
      }));
    } catch (error) {
      console.error('Error fetching bookmarks by user ID:', error);
      throw new Error('Failed to fetch bookmarks.');
    }
  }

  static async isBookmarked(userId, articleId) {
    try {
      const [rows] = await db.execute(
        `SELECT COUNT(*) as count FROM user_bookmarks WHERE user_id = ? AND article_id = ?`,
        [userId, articleId]
      );
      return rows[0].count > 0;
    } catch (error) {
      console.error('Error checking if article is bookmarked:', error);
      throw new Error('Failed to check bookmark status.');
    }
  }
}

export default Bookmark;