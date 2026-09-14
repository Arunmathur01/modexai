
import axios from "axios"
const getMessage=async(conversationId)=>{
try {
     const {data}= await axios.get(`${process.env.CHAT_SERVICE_URL}/get-message/${conversationId}`)
    return data 
} catch (error) {
    console.log(error)
    return null
    
}
  

}

export default getMessage