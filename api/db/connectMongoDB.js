import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("succesfuly connected to mongodb database");

  } catch (error) {
    console.log("Error while connecting to the database", error.message)
  }
}

export default connectMongoDB;