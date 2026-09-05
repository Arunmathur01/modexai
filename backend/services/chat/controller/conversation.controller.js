import Conversation from "../models/conversation.model.js";


const createconversation = async(req,res)=>{
   try{   
    const userId=req.headers['x-user-id'];
  
      const conversation=await Conversation.create({
        userId:userId
      })
      return res.status(200).json(conversation)
    }catch(error){
   return res.status(500).json({message:`Internal error while creating ${error}`})
    }
}

const updateconversation = async(req,res)=>{
   try{   
    const {id,title}=req.body;
    if(!id||!title){
        return res.status(400).json({message:"id and title is required"})
    }
  
      const conversation=await Conversation.findByIdAndUpdate(id,{
       title
      })
      return res.status(200).json(conversation)
    }catch(error){
   return res.status(500).json({message:`Internal error while updating ${error}`})
    }
}

const getConversation = async(req,res)=>{
  try{
   const userId=req.headers['x-user-id']

   const conversation = await Conversation.find({
    userId:userId
    
   }).sort({updatedAt:-1})
   return res.status(200).json(conversation);
  }catch(error){
  return res.status(500).json({
    message:`get conversation error ${error}`
  })
  }
}





export { createconversation,getConversation,updateconversation};