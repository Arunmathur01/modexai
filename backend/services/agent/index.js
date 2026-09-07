import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/agent.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/",router)
app.get("/",(req,res)=>{
    res.json({message:"agent service is running"})
})
const PORT = process.env.PORT ||8003;

app.listen(PORT,()=>{
    console.log(`agent service is running on ${PORT}`);
    connectDb();
})