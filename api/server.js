import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import connectMongoDB from "./db/connectMongoDB.js"
import Post from "./models/postModel.js"
import postRoute from "./routes/postRoute.js"
import cors from "cors"

const app = express();


// configurating the .env variable file 
dotenv.config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);







app.listen(PORT, () => {
  connectMongoDB();
  console.log("Server listening on " + PORT)
})