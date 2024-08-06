/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: "User API"
 *   description: "API documentation for user management"
 * host: "localhost:3000"
 * schemes:
 *   - "http"
 * paths:
 *   /api/users/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - email
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 mobile:
 *                   type: string
 *       responses:
 *         201:
 *           description: User registered successfully
 *         400:
 *           description: Bad request
 *   /api/users/login:
 *     post:
 *       summary: Log in a user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: User logged in successfully
 *         401:
 *           description: Invalid email or password
 *         500:
 *           description: Server error
 *   /api/users/logout:
 *     post:
 *       summary: Log out a user
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Logged out successfully
 *   /api/users/profile:
 *     get:
 *       summary: Get user profile
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: User profile retrieved successfully
 *         404:
 *           description: User not found
 *         500:
 *           description: Server error
 *   /api/users/all:
 *     get:
 *       summary: Get all users
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of all users
 *         500:
 *           description: Server error
 *   /api/users/notification-preferences:
 *     put:
 *       summary: Update notification preferences
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: boolean
 *                 sms:
 *                   type: boolean
 *       responses:
 *         200:
 *           description: Notification preferences updated
 *         404:
 *           description: User not found
 *         500:
 *           description: Server error
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         mobile:
 *           type: string
 *         notificationPreferences:
 *           type: object
 *           properties:
 *             email:
 *               type: boolean
 *             sms:
 *               type: boolean
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
