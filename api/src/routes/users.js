const express = require('express');
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');

const router = express.Router();

// POST /api/users/register - Register new user
router.post('/register', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], usersController.register);

// POST /api/users/login - Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], usersController.login);

// GET /api/users/profile - Get user profile (requires auth)
router.get('/profile', usersController.getProfile);

module.exports = router;