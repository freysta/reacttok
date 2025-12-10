const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Concepts table (educational content)
  db.run(`
    CREATE TABLE IF NOT EXISTS concepts (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      short_code TEXT NOT NULL,
      full_explanation TEXT NOT NULL,
      full_code TEXT NOT NULL,
      category VARCHAR(50) DEFAULT 'react-native',
      difficulty_level INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Likes table
  db.run(`
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      concept_id VARCHAR(50) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (concept_id) REFERENCES concepts (id) ON DELETE CASCADE,
      UNIQUE(user_id, concept_id)
    )
  `);

  // User progress table
  db.run(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      concept_id VARCHAR(50) NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (concept_id) REFERENCES concepts (id) ON DELETE CASCADE,
      UNIQUE(user_id, concept_id)
    )
  `);

  // Questions table (for Quizzes)
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      concept_id VARCHAR(50) NOT NULL,
      question TEXT NOT NULL,
      options TEXT NOT NULL, -- JSON array of strings
      correct_option_index INTEGER NOT NULL,
      explanation TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (concept_id) REFERENCES concepts (id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Database tables created successfully');
});

db.close();