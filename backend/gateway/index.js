import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth",proxy(process.env.AUTH_SERVICE_URL));

app.get("/",(req,res)=>{
    res.json({message:"gateway server is running"})
})
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`gateway server is running on ${PORT}`)
});
