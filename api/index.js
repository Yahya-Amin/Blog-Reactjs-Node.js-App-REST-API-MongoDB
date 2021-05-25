const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(console.log("connected to mongodb"))
.catch((err)=>console.log(err));



app.listen("5000",()=>{
    console.log("Backend is runing");
});