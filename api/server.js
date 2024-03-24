import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import connectMongoDB from "./db/connectMongoDB.js"
import Cors from 'cors'
import morgan from "morgan"
import bodyParser from "body-parser"
import helmet from "helmet"
import errorMiddleware from "./middleware/errorMiddleware.js";
import postRoute from "./routes/postRoute.js"

const app = express()

dotenv.config()
const PORT = process.env.PORT


app.use(helmet())
app.use(express.json())
app.use(cookieParser());
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//error middleware
app.use(errorMiddleware);


app.use("/api/auth", authRoute)
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute)


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