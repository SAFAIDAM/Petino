import * as jose from 'jose';
import User from '../models/userModel.js';

// export const protectRoute = (req, res, next) => {
//   const token = req.cookies.tokenjose;
//   if (!token) return next(errorHandler(401, 'You are not authenticated!'));
//   const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);

//   try {
//     jose.jwtVerify(token, encodedKey, (err, user) => {
//       return res.json({ message: "oratad youchak ghid" })
//       if (err) return next(errorHandler(403, 'Token is not valid!'));

//       req.user = user;
//       return res.json({ message: "aawa gid ilkemd" })
//       next();
//     });
//   }catch(error){
//     console.log(error)
//     res.status(500).json({ error: "Internal server error" })
//   }


// };


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

