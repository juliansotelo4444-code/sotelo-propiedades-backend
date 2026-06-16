const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/auth');
const { propertyValidation } = require('../middleware/validate');

// Rutas públicas — no requieren login
router.get('/', propertyController.getAll);
router.get('/stats', propertyController.getStats);
router.get('/:id', propertyController.getById);

// Rutas privadas — requieren JWT
router.get('/me/list', authMiddleware, propertyController.getMyProperties);
router.post('/', authMiddleware, propertyValidation, propertyController.create);
router.put('/:id', authMiddleware, propertyValidation, propertyController.update);
router.delete('/:id', authMiddleware, propertyController.delete);

module.exports = router;
