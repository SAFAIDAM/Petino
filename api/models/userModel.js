import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
  },
  verified: {
    type: Boolean,
    default: false
  },
  termsAndServices: {
    type: Boolean,
    required: true
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });




userSchema.methods.createResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.passwordResetExpires = Date.now() + 3600000;

  console.log(resetToken, this.passwordResetToken);

  return resetToken;
}

const User = mongoose.model("User", userSchema);



export default User;