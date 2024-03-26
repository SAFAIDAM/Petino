import * as jose from 'jose';
import User from '../models/userModel.js';



export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.tokenjose;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no token provided" });
    }
    
    const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jose.jwtVerify(token, encodedKey);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized -Invalid Token" });
    }
    // console.log(decoded)
    const user = await User.findById(decoded.payload.id)

    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(" error in protectRoute middleware: ", error.message)
    res.status(500).json({ error: "Internal server error " })
  }
}

