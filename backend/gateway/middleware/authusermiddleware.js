// middleware to check if the user is authenticated or not

import redis from "../../shared/redis/redis.js";


const authmiddleware = async (req,res,next)=>{

    try{
 const sessionId = req.cookies?.session // get the session id from the cookie
    if(!sessionId){
        return res.status(400).json({message:"unauthorized"});

    }
    const session=await redis.get(`session:${sessionId}`) // get the session from redis
    if(!session){
        return res.status(400).json({message:"session expired"})
    }
    req.user = JSON.parse(session) // attach the user to the request object
    next() // call the next middleware
    }
    catch(error){
  return res.status(500).json({message:"Internal server error", error:error.message})
    }
   

}

export default authmiddleware;