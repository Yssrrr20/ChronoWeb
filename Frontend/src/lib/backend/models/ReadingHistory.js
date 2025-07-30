// src/lib/backend/models/ReadingHistory.js
import db from '@/lib/db';

class ReadingHistory {
  static async add(userId, article) {
    const { id, title, url, imageUrl, category, publishedAt, author } = article;
    try {
      const [updateResult] = await db.execute(
        `UPDATE user_reading_history
         SET read_at = CURRENT_TIMESTAMP, title = ?, url = ?, image_url = ?, category = ?, published_at = ?, author = ?
         WHERE user_id = ? AND article_id = ?`,
        [title, url, imageUrl, category, publishedAt, author, userId, id]
      );

      if (updateResult.affectedRows === 0) {
        const [insertResult] = await db.execute(
          `INSERT INTO user_reading_history (user_id, article_id, title, url, image_url, category, published_at, author)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [userId, id, title, url, imageUrl, category, publishedAt, author]
        );
        return insertResult.insertId;
      }
      return updateResult.insertId || 'updated'; 
    } catch (error) {
      console.error('Error adding/updating reading history:', error);
      throw new Error('Failed to add/update reading history.');
    }
  }

  static async getByUserId(userId, limit = 10, offset = 0) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM user_reading_history
         WHERE user_id = ?
         ORDER BY read_at DESC
         LIMIT ? OFFSET ?`,
        [userId, limit, offset]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching reading history:', error);
      throw new Error('Failed to fetch reading history.');
    }
  }
}

export default ReadingHistory;