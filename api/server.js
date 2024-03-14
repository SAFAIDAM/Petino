import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import connectMongoDB from "./db/connectMongoDB.js"

const app = express()

// configurating the .env variable file 
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});


app.listen(PORT, () => {
  connectMongoDB();
  console.log("Server listening on " + PORT)
})