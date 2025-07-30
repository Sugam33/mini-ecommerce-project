import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { getUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// User profile (requires token)
router.get('/me', verifyToken, getUserProfile);

export default router;
