
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, historyController.saveHistory);
router.get('/:userId', authMiddleware, historyController.getHistory);

// Test endpoint without auth
router.post('/test', (req, res) => {
  console.log('=== Test endpoint called ===');
  console.log('Request body:', req.body);
  res.json({ message: 'Test endpoint working', received: req.body });
});

module.exports = router;
