const express = require('express');
const app = express();

// Define the rate limit parameters
const RATE_LIMIT = 5; // Requests allowed per timeWindow
const TIME_WINDOW = 60000; // 1 minute in milliseconds
const ipRequestMap = new Map();

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
  const clientIp = req.ip; // Retrieve the client's IP address

  // Check if IP address exists in the map
  if (ipRequestMap.has(clientIp)) {
    const requests = ipRequestMap.get(clientIp);
    const currentTime = new Date().getTime();

    // Filter out requests that are outside the time window
    const recentRequests = requests.filter(requestTime => (currentTime - requestTime) < TIME_WINDOW);

    // If number of recent requests exceeds the limit, return 429 status
    if (recentRequests.length >= RATE_LIMIT) {
      return res.status(429).send('Too Many Requests');
    } else {
      // Update the requests for the IP address
      ipRequestMap.set(clientIp, [...recentRequests, currentTime]);
    }
  } else {
    // If IP address is not in the map, add it with the current time
    ipRequestMap.set(clientIp, [new Date().getTime()]);
  }

  // Proceed to the next middleware
  next();
}

// Apply rate-limiting middleware to all routes
app.use(rateLimitMiddleware);

// Define your routes below...

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
