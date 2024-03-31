import * as jose from 'jose';
import User from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.tokenjose;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no token provided" });
    }
    console.log(token);

    const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jose.jwtVerify(token, encodedKey);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized -Invalid Token" });
    }
    const user = await User.findById(decoded.payload.id)

    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    req.role = decoded.payload.role
    next();

  } catch (error) {
    console.error(" error in protectRoute middleware: ", error.message)
    res.status(500).json({ error: "Internal server error " })
  }
}


export const isAdmin = async (req, res, next) => {

  try {
    if (req.role !== "admin"){
      return res.status(401).json({ error: "Forbidden - Admin access required" });
    }
    next();

  } catch (error) {
    console.error("error in isAdmin middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}