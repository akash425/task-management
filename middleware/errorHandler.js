
/**
 * Centralized error handling middleware for Express.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack to the console

    // Determine the status code from the error object or use a default status code
    const statusCode = err.statusCode || 500;

    // Send a JSON response with the error message
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            // Optionally include more information about the error here
        }
    });
}

module.exports = errorHandler;
