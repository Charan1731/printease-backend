import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Vendor from '../models/vendorSchema.js';

dotenv.config();

const vendorMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_VENDOR);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error: error.message });
    }

    // Use 'id' from the decoded token instead of 'userId'
    const user = await Vendor.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Server error', error: error.message });
  }
};

export default vendorMiddleware;
