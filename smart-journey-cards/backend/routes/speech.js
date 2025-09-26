const express = require('express');
const router = express.Router();
const speechController = require('../controllers/speechController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

console.log('Speech route file loaded.');

// Set up multer for file uploads
const upload = multer({ dest: path.join(__dirname, '../uploads') });
console.log('Multer upload middleware initialized.');

router.post('/', authMiddleware, upload.single('audio'), speechController.transcribeAudio);

module.exports = router;
