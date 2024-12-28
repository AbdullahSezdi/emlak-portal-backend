const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const propertyController = require('../controllers/propertyController');

// Multer konfigürasyonu
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Sadece resim dosyaları yüklenebilir!');
        }
    }
});

// Routes
router.get('/dashboard/stats', propertyController.getDashboardStats);
router.get('/', propertyController.getAllProperties);
router.post('/', upload.array('images', 10), propertyController.createProperty);
router.get('/:id', propertyController.getProperty);
router.put('/:id', upload.array('images', 10), propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router; 