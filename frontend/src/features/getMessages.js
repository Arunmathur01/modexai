import api from "../utilis/axios.js"

const getMessages=async(id)=>{
    try {
        const {data}= await api.get(`/api/chat/get-message/${id}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

export default getMessages;