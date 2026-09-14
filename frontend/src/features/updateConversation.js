

import api from "../utilis/axios.js"

export const updateConversation =async (payload)=>{
try {
    const {data}= await api.post("/api/chat/update-conversation",payload)
    return data
} catch (error) {
    console.log(error)
    return []
}
    
}