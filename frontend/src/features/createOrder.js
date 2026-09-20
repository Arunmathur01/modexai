import api from "../utilis/axios.js"

export const createOrder =async (plan)=>{
try {
    const {data}= await api.post("/api/billing/create-order",{plan})
    return data
} catch (error) {
    return []
}
    
}