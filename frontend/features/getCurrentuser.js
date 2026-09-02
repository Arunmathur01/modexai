import api from "../utilis/axios"

const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/api/me")//
        console.log(data)
    } catch (error) {
        console.log("Error fetching current user:", error)
    }
}

export default getCurrentUser