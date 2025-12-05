const express = require('express');
const likesController = require('../controllers/likesController');

const router = express.Router();

// POST /api/likes - Toggle like on concept
router.post('/', likesController.toggleLike);

// GET /api/likes/concept/:conceptId - Get likes count for concept
router.get('/concept/:conceptId', likesController.getConceptLikes);

// GET /api/likes/user/:userId - Get user's liked concepts
router.get('/user/:userId', likesController.getUserLikes);

module.exports = router;