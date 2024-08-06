const Task = require('../models/Task');
const User = require('../models/User');
const { sendMail } = require('../services/emailService');
const { sendSms } = require('../services/smsService');
const { AppError, NotFoundError, ValidationError } = require('../utils/customErrors');

// Create a new task
exports.createTask = async (req, res, next) => {
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
        // Additional logic for when a task is assigned
        if (task.assignedTo) {
            const user = await User.findById(task.assignedTo);
            if (user) {
                await sendMail(user.email, 'New Task created: ' + task.title);
                await sendSms(user.mobile, 'New Task created: ' + task.title);
            }
        }
        res.status(201).json(task);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Get all tasks (with optional filtering)
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find(req.query).populate('assignedTo', 'username');
        res.json(tasks);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Get a single task by ID
exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo', 'username');
        if (!task) {
            return next(new NotFoundError('Task not found', 404));
        }
        res.json(task);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Update a task
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return next(new NotFoundError('Task not found', 404));
        }
        if (task.assignedTo) {
            const user = await User.findById(task.assignedTo);
            if (user) {
                await sendMail(user.email, 'Task Updated: ' + task.title);
                await sendSms(user.mobile, 'Task Updated: ' + task.title);
            }
        }
        res.json(task);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return next(new NotFoundError('Task not found', 404));
        }
        if (task.assignedTo) {
            const user = await User.findById(task.assignedTo);
            if (user) {
                await sendMail(user.email, 'Task Deleted: ' + task.title);
                await sendSms(user.mobile, 'Task Deleted: ' + task.title);
            }
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Assign a task to a user
exports.assignTask = async (req, res, next) => {
    try {
        const { taskId, userId } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return next(new NotFoundError('Task not found', 404));
        }

        const user = await User.findById(userId);
        if (!user) {
            return next(new NotFoundError('User not found', 404));
        }

        // Check if the current user has permission to assign tasks
        if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
            return next(new AppError('Not authorized to assign tasks', 403));
        }

        task.assignedTo = userId;
        await task.save();

        await sendMail(user.email, task.title);
        await sendSms(user.mobile, task.title);

        res.json({ message: 'Task assigned successfully', task });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};
