
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Create uploads directory if it doesn't exist
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  if (req.headers['x-auth-token']) {
    console.log('Auth token present:', req.headers['x-auth-token'].substring(0, 20) + '...');
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/travel', require('./routes/travel'));
app.use('/api/history', require('./routes/history'));
app.use('/api/speech', require('./routes/speech'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
