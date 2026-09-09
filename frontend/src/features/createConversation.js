import api from "../utilis/axios.js"

export const createConversation =async ()=>{
try {
    const {data}= await api.get("/api/chat/create-conversation")
    return data
} catch (error) {
    return []
}
    
}