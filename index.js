const express = require('express');
const app = express();  
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const carRoutes = require('./src/route/car.route');
const userRoutes = require('./src/route/user.route');
const morgan = require('morgan');

const { isAuthenticated, decodedToken } = require('./src/middlewares/auth');

const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(decodedToken);
app.use(morgan('dev'));


// Routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.get('/profile', isAuthenticated, (req, res) => { 
  res.send(`Welcome to your profile, ${req.user.username}`);
});

const PORT = process.env.PORT || 4000;
const dbUrl = process.env.DB_URL;

// Middleware to decode token and attach user to request
app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


// Connect to MongoDB
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1); // Exit app if DB connection fails
});

// Export the app for testing or further configuration
module.exports = app;

