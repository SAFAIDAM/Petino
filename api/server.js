import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"
import userRoutes from './routes/userRoutes.js'

const app = express()

// configurating the .env variable file 
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())


app.use("/api/user", userRoutes)



app.listen(PORT, () => {
  connectMongoDB();
  console.log("Server listening on " + PORT)
})