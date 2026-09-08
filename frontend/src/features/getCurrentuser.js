import api from "../utilis/axios"

const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/me")//
        return data;
    } catch (error) {
        
        return null;
    }
}

export default getCurrentUser;