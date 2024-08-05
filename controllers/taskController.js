const Task = require('../models/Task');
const User = require('../models/User');
const { sendMail } = require('../services/emailService');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, assignedTo } = req.body;
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            assignedTo,
            createdBy: req.user.userId
        });
        await task.save();
        if (task.assignedTo) {
          }
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks (with optional filtering)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(req.query).populate('assignedTo', 'username');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
    try {
        console.log('Getting task');
        const task = await Task.findById(req.params.id).populate('assignedTo', 'username');
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Assign a task to a user
exports.assignTask = async (req, res) => {
    try {
        const { taskId, userId } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the current user has permission to assign tasks
        if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
            return res.status(403).json({ error: 'Not authorized to assign tasks' });
        }

        task.assignedTo = userId;
        await task.save();

        await sendMail(user.email, task.title);

        res.json({ message: 'Task assigned successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};