const express = require('express');
const router = express.Router();
const propertyTypeController = require('../controllers/propertyTypeController');
const authMiddleware = require('../middleware/auth');
const { propertyTypeValidation } = require('../middleware/validate');

// Todas las rutas de tipos requieren JWT
router.use(authMiddleware);

router.get('/', propertyTypeController.getAll);
router.get('/:id', propertyTypeController.getById);
router.post('/', propertyTypeValidation, propertyTypeController.create);
router.put('/:id', propertyTypeValidation, propertyTypeController.update);
router.delete('/:id', propertyTypeController.delete);

module.exports = router;
