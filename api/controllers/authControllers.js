import bcrypt from "bcryptjs";
import User from '../models/userModel.js'
import { errorHandler } from "../utils/error.js";
import toast from 'react-hot-toast';
import * as jose from 'jose'


export const isValidEmail = (email) => {
  // Regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const signup = async (req, res) => {
  try {

    const { fullName, username, email, password, termsAndServices, verified } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password should be at least 8 characters long" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format. Please enter a valid email address." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists. Please enter a new email" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User({
      fullName,
      username,
      email,
      password: hashedPassword,
      termsAndServices,
      verified
    })

    await newUser.save();
    res.status(201).json({ message: "user created successfully" });

  } catch (error) {

    console.log("error in signup controller", error.message);
    toast.error(error.message || "Internal server error");
    res.status(500).json({ error: "internal server error" });

  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "user not found Invalid email or password" })
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const jwt = await new jose.SignJWT({ id: user._id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
    res.cookie("tokenjose", jwt, {
      httOnly: true,
    })
    res.status(200).json({ user });

  } catch (error) {
    console.log("error in login controller", error.message)
    res.status(500).json({ error: "internal server error" })
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const existingPhoto = user.profilePicture;

      user.username = req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10) + 2, // Use a function for safer username generation
      user.profilePicture = existingPhoto;
      user.googleId = req.body.googleId;
      await user.save();

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const jwt = await new jose.SignJWT({ id: user._id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("tokenjose", jwt, {
        httOnly: true,
        expires: expiryDate
      });
      res.status(200).json({ user, message: "User found and JWT token generated" });
    } else {
      const newUser = await User({

        username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10) + 2,
        email: req.body.email,
        profilePicture: req.body.photo,
        googleId: req.body.googleId
      });
      await newUser.save();
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const jwt = await new jose.SignJWT({ id: newUser._id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("tokenjose", jwt, {
        httOnly: true,
        expires: expiryDate
      });
      res.status(200).json({ user: newUser, message: "New user created and JWT token generated" });
    }
  } catch (error) {
    console.log("error in google controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}

export const Logout = async (req, res) => {
  res.clearCookie("tokenjose").status(200).json({ message: "successfully logged out" });
};


