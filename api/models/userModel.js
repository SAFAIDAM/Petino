import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type : String,
    required : true,
    unique: true
  },
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  }
  // createdAt this let us know  when the user was created in the database then we could use it in front-end calls or display that 
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User;