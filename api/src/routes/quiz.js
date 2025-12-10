const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// GET /api/quizzes/random?limit=10
router.get('/random', quizController.getRandomQuestions);

// GET /api/quizzes/concept/:conceptId
router.get('/concept/:conceptId', quizController.getQuestionsByConcept);

// GET /api/quizzes/category/:category
router.get('/category/:category', quizController.getQuestionsByCategory);

// POST /api/quizzes (Create new question)
router.post('/', quizController.createQuestion);

module.exports = router;
