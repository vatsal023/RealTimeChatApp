require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const connection  = require('./db/db.js')

const userRoute = require("./routes/userRoute.js")

const app = express();
const PORT = 8001;

//database connection
connection();

//middlewares
app.use(express.json());
app.use("/api/user",userRoute)


app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT} `)
})