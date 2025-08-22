const express = require("express");

const app = express();
const PORT = 8001;

app.get('/',(req,res)=>{
    res.send('Hello World!')    
})

app.get('/user',(req,res)=>{
    res.send("user")
})

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT} `)
})