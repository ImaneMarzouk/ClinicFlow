const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateLogin } = require('../validators/auth.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', validateLogin, authController.login);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;