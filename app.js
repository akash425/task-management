const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const swaggerSpecs = require('./swagger');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
// const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation route

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.get('/', (req, res) => {
  res.send('Task Management API');
});
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/analytics', analyticsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});