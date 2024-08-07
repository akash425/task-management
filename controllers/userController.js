const User = require('../models/User');
const Blacklist = require('../models/Blacklist');
const client = require('../utils/redisClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AppError, NotFoundError, ValidationError } = require('../utils/customErrors');


/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is registered successfully.
 */
exports.register = async (req, res, next) => {
    try {
        const { username, email, password, role, mobile } = req.body;
        const user = new User({ username, email, password, role, mobile });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is registered successfully.
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ValidationError('Invalid email or password', 401));
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ValidationError('Invalid email or password', 401));
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

const blacklistToken = (token) => {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
        const expirationTime = decoded.exp - Math.floor(Date.now() / 1000);
        client.setex(token, expirationTime, 'blacklisted', (err, reply) => {
            if (err) throw err;
            console.log('Token blacklisted: ', reply);
        });
    }
};

/**
 * Logs out the user and sends a JSON response indicating success.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {void} Sends a JSON response with a success message.
 */
exports.logout = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Adjust according to your token format
    if (token) {
        blacklistToken(token);
        // await Blacklist.create({ token });
    }
    res.json({ message: 'Logged out successfully' });
};


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return next(new NotFoundError('User not found', 404));
        }
        res.json(user);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.updateNotificationPreferences = async (req, res) => {
    try {
        const { email, sms } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {
                $set: {
                    'notificationPreferences.email': email,
                    'notificationPreferences.sms': sms
                }
            },
            { new: true }
        );

        if (!user) {
            return next(new NotFoundError('User not found', 404));
        }

        res.json({ message: 'Notification preferences updated', preferences: user.notificationPreferences });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};