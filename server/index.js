require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connection  = require('./db/db.js')
const createWebSocketServer = require("./wsServer.js");
const path = require("path");

const userRoute = require("./routes/userRoute.js")

const app = express();
// const PORT = 8001;

//database connection
connection();

//middlewares
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4000",
    "https://swifty-chatty-appy.onrender.com"
];

const corsOptions = {
    origin :(origin,callback) =>{
        if(allowedOrigins.includes(origin)|| !origin){
            callback(null,true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus :204,
    credentials: true,
}
app.use(cors(corsOptions));

app.use("/api/user",userRoute)
// app.get("/use",(req,res)=>{
//     res.send("Hello world")
// })

// const PORT = 8001;
const PORT = process.env.PORT||8001;

const server = app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT} `)
})

createWebSocketServer(server);
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend","dist","index.html"), (err) => {
//         if (err) {
//             console.error('Error sending file:', err);
//         }
//     });
// });