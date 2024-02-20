const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticationMiddleware;
