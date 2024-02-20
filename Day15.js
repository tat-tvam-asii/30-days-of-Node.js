/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function loggingMiddleware(req, res, next) {
    // Get current timestamp
    const timestamp = new Date().toISOString();
  
    // Log request details
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
  
    // Call next middleware
    next();
  }
  
  // Example usage:
  const express = require('express');
  const app = express();
  
  // Apply logging middleware to all routes
  app.use(loggingMiddleware);
  
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  