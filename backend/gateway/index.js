import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import getUserController from "./controller/getusercontroller.js";
import authmiddleware from "./middleware/authusermiddleware.js";
import proxyHeaderWithUserId from "./utilis/proxyHeaderwithuserid.js";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(morgan("dev"))

app.use(express.json());
app.use(cookieParser());// Parse cookies from incoming requests
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Allow requests from the frontend URL
    credentials: true // Include credentials (cookies) in requests
}))
app.use("/api/auth",proxy(process.env.AUTH_SERVICE_URL)); // Proxy requests to the auth service
app.use("/api/chat",authmiddleware,proxyHeaderWithUserId(process.env.CHAT_SERVICE_URL)); // Proxy requests to the chat service
app.use("/api/billing",authmiddleware,proxyHeaderWithUserId(process.env.BILLING_SERVICE_URL)); // Proxy requests to the chat service
app.use("/api/agent",authmiddleware,proxy(process.env.AGENT_SERVICE_URL)); // Proxy requests to the agent service
app.get("/api/me",authmiddleware,getUserController) // Get the current user information
app.get("/",(req,res)=>{
    res.json({message:"gateway server is running"})
})
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`gateway server is running on ${PORT}`)
});
