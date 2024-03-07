import express from "express"
import dotenv from "dotenv"

const app = express()

// configurating the .env variable file 
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())



app.listen(PORT, () => {
  console.log("Server listening on " + PORT)
})