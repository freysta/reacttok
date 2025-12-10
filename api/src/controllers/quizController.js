const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');

const getQuestionsByConcept = (req, res) => {
  const { conceptId } = req.params;
  const db = new sqlite3.Database(dbPath);

  db.all('SELECT * FROM questions WHERE concept_id = ?', [conceptId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Parse options from JSON string
    const questions = rows.map(q => {
      try {
        return {
          ...q,
          options: JSON.parse(q.options)
        };
      } catch (e) {
        return {
            ...q,
            options: []
        };
      }
    });

    res.json({
      success: true,
      data: questions
    });
  });

  db.close();
};

const getRandomQuestions = (req, res) => {
  const limit = req.query.limit || 10;
  const db = new sqlite3.Database(dbPath);

  db.all('SELECT * FROM questions ORDER BY RANDOM() LIMIT ?', [limit], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    const questions = rows.map(q => {
        try {
            return {
              ...q,
              options: JSON.parse(q.options)
            };
        } catch (e) {
            return {
                ...q,
                options: []
            };
        }
    });

    res.json({
      success: true,
      data: questions
    });
  });

  db.close();
};

const getQuestionsByCategory = (req, res) => {
  const { category } = req.params;
  const limit = req.query.limit || 10;
  const db = new sqlite3.Database(dbPath);

  if (category === 'all') {
    return getRandomQuestions(req, res);
  }

  const query = `
    SELECT q.* 
    FROM questions q
    JOIN concepts c ON q.concept_id = c.id
    WHERE c.category = ?
    ORDER BY RANDOM()
    LIMIT ?
  `;

  db.all(query, [category, limit], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    const questions = rows.map(q => {
      try {
        return {
          ...q,
          options: JSON.parse(q.options)
        };
      } catch (e) {
        return {
          ...q,
          options: []
        };
      }
    });

    res.json({
      success: true,
      data: questions
    });
  });

  db.close();
};

const createQuestion = (req, res) => {
    const { concept_id, question, options, correct_option_index, explanation } = req.body;
    
    if (!concept_id || !question || !options || correct_option_index === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = new sqlite3.Database(dbPath);

    db.run(`
        INSERT INTO questions (concept_id, question, options, correct_option_index, explanation)
        VALUES (?, ?, ?, ?, ?)
    `, [concept_id, question, JSON.stringify(options), correct_option_index, explanation || ''], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ success: true, id: this.lastID, message: 'Question created' });
    });
    db.close();
};

module.exports = {
  getQuestionsByConcept,
  getRandomQuestions,
  getQuestionsByCategory,
  createQuestion
};
