const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validate');

router.post('/register', registerValidation, authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', loginValidation, authController.login);
router.get('/me', authMiddleware, authController.getProfile);

module.exports = router;
