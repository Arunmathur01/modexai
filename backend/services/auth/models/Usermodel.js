import mongoose from "mongoose";

const UserSchema= new mongoose.Schema(
    {
        firebaseUid:{
            type:String,
            required:true,
            unique:true
        },
    
 name:String,
 email:String,
 avatar:String,
 plan:{
    type:String,
    default:"Free"
 },
 credits:{
    type:Number,
    default:100
 },
 totalcredits:{
    type:Number,
    default:100
 },
 planExpiresAt:Date
},{
 timestamps:true
});

const User= mongoose.model("User",UserSchema);

export default User;