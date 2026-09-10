
import api from "../utilis/axios.js"
const sendMessage =async(payload)=>{
    try {
const {data}= await api.post("/api/agent/chat",payload);
console.log(data)
return data

        
    } catch (error) {
        console.log(error)
        return null
    }

}

export default sendMessage