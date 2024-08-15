import { connect } from "http2"
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

const PORT = process.env.PORT || 3124
connectToDatabase().then(()=>{
  app.listen(PORT, ()=> console.log("Server is up and connected to DB"))
}).catch((err)=>console.log(err))
