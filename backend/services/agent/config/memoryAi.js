
import redis from "../../../shared/redis/redis.js"
import getMessage from "../utilis/getMessagesForAi.js";
// creating memory in redis for Ai so that it can understand the privous chat and give ans 
const getMemory=async(conversationId)=>{
    const key = `messages-${conversationId}`;
 const cached = await redis.get(key)
 if (cached){
     return JSON.parse(cached);
 }
 const messages = await getMessage(conversationId)
 await redis.set(key,JSON.stringify(messages),"EX",24*60*60)

 return messages


}

const addMessage=async(conversationId,role,content)=>{
    const key = `messages-${conversationId}`;
 const rawresponse = await redis.get(key)
 const message= rawresponse?JSON.parse(rawresponse):[]
 message.push({
    role,
    content
 })

 if (message.length>20){
     message.shift()
 }
 
 await redis.set(key,JSON.stringify(message))

 


}

export  {getMemory,addMessage}