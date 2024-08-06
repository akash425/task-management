/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   version: "1.0.0"
 *   title: "Tasks API"
 *   description: "API documentation for task management"
 * host: "localhost:3000"
 * schemes:
 *   - "http"
 * paths:
 *   /api/tasks/:
 *     post:
 *       summary: Create a new task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - description
 *                 - dueDate
 *                 - priority
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                 priority:
 *                   type: string
 *                   enum: [Low, Medium, High]
 *                 assignedTo:
 *                   type: string
 *       responses:
 *         201:
 *           description: Task created successfully
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *         400:
 *           description: Bad request
 *     get:
 *       summary: Get all tasks
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: status
 *           in: query
 *           description: Filter tasks by status
 *           schema:
 *             type: string
 *             enum: [Todo, InProgress, Done]
 *         - name: priority
 *           in: query
 *           description: Filter tasks by priority
 *           schema:
 *             type: string
 *             enum: [Low, Medium, High]
 *       responses:
 *         200:
 *           description: List of tasks
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Task'
 *         500:
 *           description: Server error
 *   /api/tasks/{id}:
 *     get:
 *       summary: Get a single task by ID
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Task retrieved successfully
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *         404:
 *           description: Task not found
 *         500:
 *           description: Server error
 *     put:
 *       summary: Update a task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                 priority:
 *                   type: string
 *                   enum: [Low, Medium, High]
 *                 assignedTo:
 *                   type: string
 *       responses:
 *         200:
 *           description: Task updated successfully
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *         404:
 *           description: Task not found
 *         400:
 *           description: Bad request
 *     delete:
 *       summary: Delete a task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Task deleted successfully
 *         404:
 *           description: Task not found
 *         500:
 *           description: Server error
 *   /api/tasks/assign:
 *     post:
 *       summary: Assign a task to a user
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - taskId
 *                 - userId
 *               properties:
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *       responses:
 *         200:
 *           description: Task assigned successfully
 *         404:
 *           description: Task or User not found
 *         403:
 *           description: Not authorized to assign tasks
 *         500:
 *           description: Server error
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - priority
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date-time
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *         assignedTo:
 *           type: string
 *         createdBy:
 *           type: string
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
