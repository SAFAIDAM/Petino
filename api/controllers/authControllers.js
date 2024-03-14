
import bcrypt from "bcryptjs";
import User from '../models/userModel.js'
import { errorHandler } from "../utils/error.js";

export const isValidEmail = (email) => {
  // Regular expression pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
};

export const signup = async (req, res, next) => {
  try {

    const { fullName, username, email, password, termsAndServices, verified } = req.body;
    if (password.length < 8) {
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

    // hashing the password here 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(password, salt); // Ensure password is converted to a string
    const newUser = await User({
      fullName,
      username,
      email,
      password: hashedPassword,
      termsAndServices,
      verified
    })

    await newUser.save();  // Save the new user to the database
    res.status(201).json({ message: "user created successfully" });

  } catch (error) {

    console.log("error in signup controller", error.message)
    res.status(500).json({ error: "internal server error" })

  }
}