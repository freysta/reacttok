const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');

const toggleLike = (req, res) => {
  const { userId, conceptId } = req.body;
  
  if (!userId || !conceptId) {
    return res.status(400).json({ error: 'userId and conceptId are required' });
  }
  
  const db = new sqlite3.Database(dbPath);
  
  // Check if like exists
  db.get('SELECT * FROM likes WHERE user_id = ? AND concept_id = ?', [userId, conceptId], (err, existingLike) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (existingLike) {
      // Remove like
      db.run('DELETE FROM likes WHERE user_id = ? AND concept_id = ?', [userId, conceptId], function(err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
          success: true,
          message: 'Like removed',
          liked: false
        });
      });
    } else {
      // Add like
      db.run('INSERT INTO likes (user_id, concept_id) VALUES (?, ?)', [userId, conceptId], function(err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
          success: true,
          message: 'Like added',
          liked: true
        });
      });
    }
  });
  
  db.close();
};

const getConceptLikes = (req, res) => {
  const { conceptId } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  db.get('SELECT COUNT(*) as count FROM likes WHERE concept_id = ?', [conceptId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({
      success: true,
      conceptId,
      likesCount: result.count
    });
  });
  
  db.close();
};

const getUserLikes = (req, res) => {
  const { userId } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  db.all(`
    SELECT c.*, l.created_at as liked_at 
    FROM concepts c 
    JOIN likes l ON c.id = l.concept_id 
    WHERE l.user_id = ? 
    ORDER BY l.created_at DESC
  `, [userId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  });
  
  db.close();
};

module.exports = {
  toggleLike,
  getConceptLikes,
  getUserLikes
};