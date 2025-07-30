import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
