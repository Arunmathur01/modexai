import api from "../utilis/axios.js"

export const verifyPayment =async (payload)=>{
try {
    const {data}= await api.post("/api/billing/verify-payment",payload)
    return data
} catch (error) {
    return []
}
    
}