const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegister,validateLogin,validateNotificationPreferences } = require('../middleware/validate');
const { loginLimiter } = require('../middleware/rateLimit');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');


router.post('/register', validateRegister, userController.register);

router.post('/login', validateLogin, loginLimiter , userController.login);

router.post('/logout', authenticate, userController.logout);

router.get('/profile', authenticate, userController.getUserProfile);

router.get('/all', authenticate, authorize('Admin'), userController.getAllUsers);

router.put('/notification-preferences', validateNotificationPreferences, authenticate, userController.updateNotificationPreferences);

module.exports = router;
