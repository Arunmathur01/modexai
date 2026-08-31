import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utilis/firebase'
import api from '../utilis/axios'
const App = () => {
// 
  const handleLogin = async (token) => {
try{
  const {data} = await api.post("/auth/login",{token})
  console.log(data)
}catch(error){
  console.error("Error during login:", error)
}
  }
  const googleLogin = async() => {
   const data = await signInWithPopup(auth, googleProvider)
   const token = await data.user.getIdToken();
   console.log(token)
   await handleLogin(token)
   console.log(data);
  }
  return (
    <div className="flex items-center justify-center h-screen">
     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={googleLogin}>
      continue with google
      </button>
    </div>
  )
}

export default App
