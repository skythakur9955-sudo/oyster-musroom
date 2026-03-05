const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getCurrentUser,
    updateProfile      // यह import add करें
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);  // यह नया route add करें

module.exports = router;