import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());// Parse cookies from incoming requests
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Allow requests from the frontend URL
    credentials: true // Include credentials (cookies) in requests
}))
app.use("/auth",proxy(process.env.AUTH_SERVICE_URL)); // Proxy requests to the auth service

app.get("/",(req,res)=>{
    res.json({message:"gateway server is running"})
})
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`gateway server is running on ${PORT}`)
});
