const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin girişi
router.post('/login', authController.login);

// İlk admin hesabını oluştur
router.get('/create-admin', authController.createAdmin);

module.exports = router; 