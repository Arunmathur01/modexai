import Message from "../models/message.model.js"


const saveMessage = async(req,res)=>{
    try{
    const {conversationId,role,content}=req.body
    if(!conversationId || !role || !content){
        return res.status(400).json({message:"conversationId,role and content are required"})
    }
    const message = await Message.create({
        conversationId,
        role,
        content
    })
    return res.status(200).json({message:"Message created successfully",message})
    
    }
    catch(error){
 return res.status(500).json({message:`Internal error while creating message ${error}`})
    }

}

const getMessage = async(req,res)=>{
    try {
    //    const{ conversationId } = req.body
     const message = await Message.find({
        conversationId:req.params.conversationId
     }).sort({updatedAt:-1})
     return res.status(200).json({message:"get all message success",message})
    } catch (error) {
        return res.status(200).json({message:`get all message success ${error}`})
    }
}


export {saveMessage,getMessage};
