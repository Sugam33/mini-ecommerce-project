import { body } from 'express-validator';

export const signupValidator = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Valid email required.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email required.'),
  body('password').notEmpty().withMessage('Password is required.')
];
