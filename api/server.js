import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import adminRoute from "./routes/adminRoute.js"
import rescuepostRoute from "./routes/rescuepostRoute.js"
import connectMongoDB from "./db/connectMongoDB.js"
import serviceRoutes from "./routes/serviceRoutes.js";
import Cors from 'cors'
import postRoute from "./routes/postRoute.js"

import cors from "cors"


const app = express();
dotenv.config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(Cors())

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/rescuepost", rescuepostRoute);
app.use("/api/posts", postRoute)
app.use("/api/services", serviceRoutes);


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