const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load .env

const JWT_SECRET = process.env.JWT_SECRET; // ✅ Correct: use the one from .env

const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => { // ✅ Use JWT_SECRET
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error(`Error in isAuthenticated middleware: ${error.message}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const decodedToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET); // ✅ Match here too
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = {
    isAuthenticated,
    decodedToken
};
