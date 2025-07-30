import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const newUser = new User({ name, email, password, role });

    // Generate token with user info
    const token = generateToken({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id
    });

    newUser.token = token;
    await newUser.save();

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        _id: newUser._id,
        token: newUser.token
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed.', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken({
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
        token: user.token
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed.', error: err.message });
  }
};
