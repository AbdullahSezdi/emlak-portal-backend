const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const {
  getAllProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  getDashboardStats
} = require('../controllers/propertyController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Public routes
router.get('/properties', getAllProperties);
router.get('/properties/:id', getProperty);

// Protected routes
router.post('/properties', auth, upload.array('images', 10), createProperty);
router.put('/properties/:id', auth, upload.array('images', 10), updateProperty);
router.delete('/properties/:id', auth, deleteProperty);
router.get('/dashboard/stats', auth, getDashboardStats);

module.exports = router; 