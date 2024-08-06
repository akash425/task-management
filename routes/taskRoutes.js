const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.post('/', authenticate, taskController.createTask);
router.get('/', authenticate, taskController.getTasks);
router.get('/:id', authenticate, taskController.getTask);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, authorize('Admin', 'Manager'), taskController.deleteTask);
router.post('/assign', authenticate, authorize('Admin', 'Manager'), taskController.assignTask);

module.exports = router;