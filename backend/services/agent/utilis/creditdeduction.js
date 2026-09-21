
import axios from "axios"
const deductCredits=async(userId,agent)=>{
try {
     const {data}= await axios.post(`${process.env.AUTH_SERVICE_URL}/deduct-credits`,{userId,agent})
    return data 
} catch (error) {
    console.log(error)
    return null
    
}
  

}

export default deductCredits