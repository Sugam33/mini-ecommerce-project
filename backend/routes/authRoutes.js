import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { getUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { signupValidator, loginValidator } from '../middleware/authValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Auth routes with validation
router.post('/signup', signupValidator, validateRequest, signup);
router.post('/login', loginValidator, validateRequest, login);

// User profile 
router.get('/me', verifyToken, getUserProfile);

export default router;
