import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "user"], 
    default: "user" 
  },
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
  bio:
  {
    type: String,
    maxLength: 400,
  
  },
  experience:
  {
    type: String,
    maxLength: 400,

  },
  instagramLink:
  {
    type: String,

  },
  facebookLink:
  {
    type: String,

  },
  optionalLink:
  {
    type: String,

  },
  profilePicture: {
    type: String,
    default: "https://cute-cat-avatars.fly.dev/api/v1/cat"
  },
  termsAndServices: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });



const User = mongoose.model("User", userSchema);



export default User;