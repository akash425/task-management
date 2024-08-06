/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: "Analytics API"
 *   description: "API documentation for analytics and reporting"
 * host: "localhost:3000"
 * schemes:
 *   - "http"
 * paths:
 *   /api/analytics/task-stats:
 *     get:
 *       summary: Get task statistics
 *       tags: [Analytics]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Task statistics retrieved successfully
 *           schema:
 *             type: object
 *             properties:
 *               Todo:
 *                 type: integer
 *                 description: Number of tasks with status 'Todo'
 *               InProgress:
 *                 type: integer
 *                 description: Number of tasks with status 'InProgress'
 *               Done:
 *                 type: integer
 *                 description: Number of tasks with status 'Done'
 *         403:
 *           description: Forbidden, not authorized to access
 *         500:
 *           description: Server error
 *   /api/analytics/user-productivity/{userId}:
 *     get:
 *       summary: Get user productivity metrics
 *       tags: [Analytics]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user to get productivity metrics for
 *       responses:
 *         200:
 *           description: User productivity metrics retrieved successfully
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               totalTasks:
 *                 type: integer
 *                 description: Total number of tasks assigned to the user
 *               completedTasks:
 *                 type: integer
 *                 description: Number of tasks completed by the user
 *               productivityRate:
 *                 type: number
 *                 format: float
 *                 description: Productivity rate of the user as a percentage
 *         404:
 *           description: User not found
 *         403:
 *           description: Forbidden, not authorized to access
 *         500:
 *           description: Server error
 * components:
 *   schemas:
 *     TaskStats:
 *       type: object
 *       properties:
 *         Todo:
 *           type: integer
 *           description: Number of tasks with status 'Todo'
 *         InProgress:
 *           type: integer
 *           description: Number of tasks with status 'InProgress'
 *         Done:
 *           type: integer
 *           description: Number of tasks with status 'Done'
 *     UserProductivity:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         totalTasks:
 *           type: integer
 *           description: Total number of tasks assigned to the user
 *         completedTasks:
 *           type: integer
 *           description: Number of tasks completed by the user
 *         productivityRate:
 *           type: number
 *           format: float
 *           description: Productivity rate of the user as a percentage
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

