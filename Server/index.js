import express from "express"
import cors from "cors"
import uploader from "./routes/upload.routes.js"
import dotenv from 'dotenv';


const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
}

dotenv.config(); // Load the .env file


const app = express()

app.use(cors(corsOptions))
app.use(express.json())


// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//use the upload route
app.use('/api',uploader)






const port = process.env.port || 3000


app.listen(port,()=>{
   console.log(`app works on ${port}`)
})
