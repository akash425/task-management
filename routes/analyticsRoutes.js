const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/task-stats', authenticate, authorize('Admin', 'Manager'), analyticsController.getTaskStats);
router.get('/user-productivity/:userId', authenticate, authorize('Admin', 'Manager'), analyticsController.getUserProductivity);

module.exports = router;