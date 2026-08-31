import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb= ()=>{
   try{
    mongoose.connect(process.env.MONGO_URI)
    console.log("connected to db");
   }
   catch(error){
    console.log("error in connecting to db",error);
   }
}

export default connectDb;