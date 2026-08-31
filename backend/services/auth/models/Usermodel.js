import mongoose from "mongoose";

const UserSchema= new mongoose.Schema(
    {
        firebaseUid:{
            type:String,
            required:true,
            unique:true
        },
    
 name:string,
 email:string,
 avatar:string,
},{
 timestamps:true
});

export default User= mongoose.model("User",UserSchema);