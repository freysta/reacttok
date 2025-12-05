const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { validationResult } = require('express-validator');

const dbPath = path.join(__dirname, '../../database.sqlite');

const getAllConcepts = (req, res) => {
  const db = new sqlite3.Database(dbPath);
  
  db.all('SELECT * FROM concepts ORDER BY difficulty_level, created_at', (err, rows) => {
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

const getConceptById = (req, res) => {
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  db.get('SELECT * FROM concepts WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Concept not found' });
    }
    
    res.json({
      success: true,
      data: row
    });
  });
  
  db.close();
};

const createConcept = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, title, description, short_code, full_explanation, full_code, category = 'react-native', difficulty_level = 1 } = req.body;
  const db = new sqlite3.Database(dbPath);
  
  db.run(
    `INSERT INTO concepts (id, title, description, short_code, full_explanation, full_code, category, difficulty_level)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, title, description, short_code, full_explanation, full_code, category, difficulty_level],
    function(err) {
      if (err) {
        console.error(err);
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(409).json({ error: 'Concept ID already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.status(201).json({
        success: true,
        message: 'Concept created successfully',
        data: { id }
      });
    }
  );
  
  db.close();
};

const updateConcept = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const updates = req.body;
  const db = new sqlite3.Database(dbPath);
  
  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(updates), id];
  
  db.run(
    `UPDATE concepts SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    values,
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Concept not found' });
      }
      
      res.json({
        success: true,
        message: 'Concept updated successfully'
      });
    }
  );
  
  db.close();
};

const deleteConcept = (req, res) => {
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  
  db.run('DELETE FROM concepts WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Concept not found' });
    }
    
    res.json({
      success: true,
      message: 'Concept deleted successfully'
    });
  });
  
  db.close();
};

module.exports = {
  getAllConcepts,
  getConceptById,
  createConcept,
  updateConcept,
  deleteConcept
};