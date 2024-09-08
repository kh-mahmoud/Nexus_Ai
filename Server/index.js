import express from "express"
import cors from "cors"
import uploader from "./routes/upload.routes.js"
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

const corsOptions = {
  origin: "https://nexus-ai-one.vercel.app",
  optionsSuccessStatus: 200 
}



const app = express()

app.use(cors(corsOptions))
app.use(express.json())



//use the upload route
app.use('/api',uploader)






const port = process.env.port || 3000


app.listen(port,()=>{
   console.log(`app works on ${port}`)
})
