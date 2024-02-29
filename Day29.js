const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/error', (req, res, next) => {
    // Simulate an error
    const err = new Error('Sample Error');
    next(err);
});

// Error handling middleware
function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = {};
        for (let field in err.errors) {
            errors[field] = err.errors[field].message;
        }
        message = 'Validation Error';
    }

    console.error(err);

    res.status(statusCode).json({
        success: false,
        error: message
    });
}

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
