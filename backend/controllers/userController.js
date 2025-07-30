export const getUserProfile = (req, res) => {
  try {
    const { name, email, role, _id } = req.user;  // Decoded from JWT in verifyToken
    res.status(200).json({
      name,
      email,
      role,
      _id
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch user profile', error: error.message });
  }
};
