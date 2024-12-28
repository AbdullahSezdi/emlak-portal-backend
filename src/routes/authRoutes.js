const express = require('express');
const router = express.Router();
const { login, createFirstAdmin } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Create first admin route (should be disabled in production)
router.post('/create-admin', createFirstAdmin);

module.exports = router; 