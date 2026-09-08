import axios from "axios";
// create an axios for api calls to backend server with base url and credentials
const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true, // Include credentials (cookies) in requests
})


export default api