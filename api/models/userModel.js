import mongoose from "mongoose";

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
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;