
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js"

import User from "../models/Usermodel.js";
const login = async(req,res) =>{
    try{
     const {token} = req.body
     const decoded = await getAuth(app).verifyIdToken(token) // verify the token using Firebase Admin SDK
    //find user in database by matching firebaseUid with decoded.uid token 
    
     let user = await User.findOne({firebaseUid:decoded.uid})

     if(!user){
        //if user does not exist, create a new user in the database
        user = await User.create({
            firebaseUid:decoded.uid,
             name:decoded.name,
            email:decoded.email, 
            avatar:decoded.picture   
     })
    }
    //session id and cookie creation
    const sessionId = crypto.randomUUID() // generate a random session id
    res.cookie("session", sessionId, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }) // set cookie with session id
    return res.status(200).json(user) // return the new user or existing user

    }catch(error){
         return res.status(500).json({message:"Login failed", error:error.message})
}
}


export default login;