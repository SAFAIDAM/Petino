import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
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
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
  },
  termsAndServices: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });



const User = mongoose.model("User", userSchema);



export default User;