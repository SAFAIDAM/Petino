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
  categories: [{
    type: String,
    enum: ["Hosting", "Grooming", "Pet-sitting", "Walking", "Veterinary", "Daycare", "Training", "Food", "Cleanup", "Supplies", "Spa", "Other"]
  }],
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
    default: "https://i.pinimg.com/564x/ce/a6/e4/cea6e4ee204372b16113f3b9487f1d46.jpg"
  },
  termsAndServices: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });



const User = mongoose.model("User", userSchema);



export default User;