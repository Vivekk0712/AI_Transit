
const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/query', authMiddleware, travelController.query);
router.post('/recommend', authMiddleware, travelController.recommend);
router.get('/locations', authMiddleware, travelController.locations);

module.exports = router;
