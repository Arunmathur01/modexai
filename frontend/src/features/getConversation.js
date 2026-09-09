import api from "../utilis/axios.js"

 export const getConversation =async ()=>{
try {
    const {data}= await api.get("/api/chat/get-conversation")
    return data
} catch (error) {
    return []
}
    
}