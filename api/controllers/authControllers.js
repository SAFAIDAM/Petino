import bcrypt from "bcryptjs";
import User from '../models/userModel.js'
import { errorHandler } from "../utils/error.js";
import toast from 'react-hot-toast';
import * as jose from 'jose'
import createResetPasswordToken from '../models/userModel.js'
// import sendEmail from "../utils/email.js";



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
    if (!termsAndServices) {
      return res.status(401).json({ error: " terms and services must be checked" });
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

    console.log("error in signup controller", error.message);
    toast.error(error.message || "Internal server error");
    res.status(500).json({ error: "internal server error" });

  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usermail = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, usermail?.password || "");
    if (!usermail || !isPasswordCorrect) {
      return res.status(400).json({ error: "user not found Invalid email or password" })
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const jwt = await new jose.SignJWT({ id: usermail._id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
    res.cookie("tokenjose", jwt, {
      httOnly: true,
    })
    res.status(200).json({ jwt });

  } catch (error) {
    console.log("error in login controller", error.message)
    res.status(500).json({ error: "internal server error" })
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const jwt = await new jose.SignJWT({ id: user._id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("tokenjose", jwt, {
        httOnly: true,
        expires: expiryDate
      });
      res.status(200).json({ user, message: "User found and JWT token generated" }); // Including user data in the JSON response
    } else {
      const generatedPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = await User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo
      });
      await newUser.save();
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const jwt = await new jose.SignJWT({ id: newUser._id }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("tokenjose", jwt, {
        httOnly: true,
        expires: expiryDate
      });
      res.status(200).json({ user: newUser, message: "New user created and JWT token generated" }); // Including user data in the JSON response
    }
  } catch (error) {
    console.log("error in google controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}





// export const forgotpassword = async (req, res, next) => {
//   // 1. GET BASED ON POSTED EMAIL
//   const user =  await User.findOne({ email: req.body.email });
//   //2. GENERATE A RANDOM RESET TOKEN
//   if(!user){
//     return res.status(404).json({ error: "we could not find the user with given email"})
//   }
//   const resetToken = user.createResetPasswordToken();
//   await user.save({ validateBeforeSave: false })
//   //3. SEND THE TOKEN BACK TO THE USER EMAIL
//   const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`
//   const message = `we have received a password reset request. Please use the Button below to reset your password\n\n${resetUrl}\n\nThis reset password link well be valide only for 10 min`
//   // try{
//   //   await sendEmail({
//   //     email : user.email,
//   //     subject : "Password Reset",
//   //     message: message
//   //    })
//   //    res.status(200).json({ message: "we have sent you an email with further instructions" })
//   // }catch(error){
//   //   user.passwordResetToken = undefined
//   //   user.passwordResetTokenExpires = undefined
//   //   user.save({ validateBeforeSave: false
//   //    })

//   //   return next(error)
//   // }

// }

// export const resetPassword = async (req, res, next) => {

// }





