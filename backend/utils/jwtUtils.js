import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

// Generates token with full user payload
export const generateToken = (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role  
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

// Verifies token and returns decoded data
export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
