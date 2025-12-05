const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { validationResult } = require('express-validator');

const dbPath = path.join(__dirname, '../../database.sqlite');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const db = new sqlite3.Database(dbPath);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      function(err) {
        if (err) {
          console.error(err);
          if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: 'Username or email already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }
        
        const token = jwt.sign(
          { userId: this.lastID, username, email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        res.status(201).json({
          success: true,
          message: 'User registered successfully',
          token,
          user: { id: this.lastID, username, email }
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    db.close();
  }
};

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const db = new sqlite3.Database(dbPath);
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    try {
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  db.close();
};

const getProfile = (req, res) => {
  // This would require auth middleware to extract user from token
  res.json({ message: 'Profile endpoint - requires auth middleware' });
};

module.exports = {
  register,
  login,
  getProfile
};