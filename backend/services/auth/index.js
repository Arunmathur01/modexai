import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"auth service is running"})
})
const PORT = process.env.PORT ||8001;

app.listen(PORT,()=>{
    console.log(`auth service is running on ${PORT}`);
    connectDb();
})