const express = require('express');
const { body, validationResult } = require('express-validator');
const conceptsController = require('../controllers/conceptsController');

const router = express.Router();

// GET /api/concepts - List all concepts
router.get('/', conceptsController.getAllConcepts);

// GET /api/concepts/:id - Get specific concept
router.get('/:id', conceptsController.getConceptById);

// POST /api/concepts - Create new concept (admin only)
router.post('/', [
  body('id').isLength({ min: 1 }).trim().escape(),
  body('title').isLength({ min: 1 }).trim().escape(),
  body('description').isLength({ min: 1 }).trim(),
  body('short_code').isLength({ min: 1 }),
  body('full_explanation').isLength({ min: 1 }),
  body('full_code').isLength({ min: 1 })
], conceptsController.createConcept);

// PUT /api/concepts/:id - Update concept (admin only)
router.put('/:id', [
  body('title').optional().isLength({ min: 1 }).trim().escape(),
  body('description').optional().isLength({ min: 1 }).trim(),
  body('short_code').optional().isLength({ min: 1 }),
  body('full_explanation').optional().isLength({ min: 1 }),
  body('full_code').optional().isLength({ min: 1 })
], conceptsController.updateConcept);

// DELETE /api/concepts/:id - Delete concept (admin only)
router.delete('/:id', conceptsController.deleteConcept);

module.exports = router;