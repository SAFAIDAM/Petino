import mongoose from "mongoose";

const RecordSchema = mongoose.Schema({
  usernameAdopter: {
    type: String,
    required: true,
    unique: true
  },
  emailAdopter: {
    type: String,
    required: true,
    unique: true
  },
  PetName: {
    type: String,
    required: true,
    unique: true
  },
  PetAge:
  {
    type: String,
    required: true,
    unique: true

  },
  AdoptingDate:
  {
    type: String,
    required: true,
    unique: true

  }
}, { timestamps: true });



const Record = mongoose.model("Record", RecordSchema);



export default Record;