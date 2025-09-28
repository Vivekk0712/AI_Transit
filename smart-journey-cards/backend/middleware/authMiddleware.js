
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  console.log('=== Auth Middleware Called ===');
  console.log('Path:', req.path);
  console.log('Method:', req.method);
  
  const token = req.header('x-auth-token');
  console.log('Token present:', !!token);

  if (!token) {
    console.log('No token found, returning 401');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully, user ID:', decoded.user.id);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
