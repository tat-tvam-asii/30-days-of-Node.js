const express = require("express");
const jwt = require("jsonwebtoken");

// Import the authentication middleware function
const authenticationMiddleware = require('./authenticationMiddleware');

// Secret key for signing and verifying JWTs
const JWT_SECRET = "12345";

const app = express();
app.use(express.json());

// Login route to generate JWT token
app.post('/login', (req, res) => {
    const { id, username } = req.body;
    if (!id || !username) {
        return res.status(400).json({ message: 'User id and username are required' });
    }
    const user = { id, username };
    const token = jwt.sign(user, JWT_SECRET);
    res.json({ token });
});

// Protected route that requires authentication
app.get('/home', authenticationMiddleware, (req, res) => {
    res.send(`Hello ${req.user.username} 👋`);
});

// Start the server
app.listen(3001, () => {
    console.log(`Server is running on port ${3001}`);
});
