
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, historyController.saveHistory);
router.get('/:userId', authMiddleware, historyController.getHistory);

module.exports = router;
