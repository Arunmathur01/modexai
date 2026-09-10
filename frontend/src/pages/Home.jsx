import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from'../utilis/firebase.js'
import api from '../utilis/axios.js'
import { FcGoogle } from "react-icons/fc";
import {  useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SetUserdata } from '../redux/userSlice.js'
import SideBar from "../components/SideBar.jsx"
import ChatBar from "../components/ChatArea.jsx"
import PreviewBar from "../components/PreviewBar.jsx"



function Home() {

   const {userData} = useSelector(state => state.user);// it is used to get the user data from the redux store. The useSelector hook is provided by react-redux and it allows you to access the state of the redux store. In this case, it is used to get the user data from the user slice of the redux store. The userData variable will contain the user data if the user is logged in, otherwise it will be null.
   const dispatch = useDispatch();
//    console.log(userData);

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(SetUserdata(data)) //it is used to set the user data in the redux store. The SetUserdata action is dispatched with the user data obtained from the backend API after a successful login. This will update the user data in the redux store and make it available throughout the application.
         
        } catch (error) {
            console.error("Error during login:", error)
        }
    }
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider) 
        const token = await data.user.getIdToken();
       // console.log(token)
        await handleLogin(token)
        //console.log(data);
    }
    return (
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
        <SideBar/>
        <ChatBar />
        <PreviewBar/>
       {!userData &&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur">
        
           <div className="w-85 bg-[#13151c] border border-white/8 p-7 rounded-2xl flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <h2 className=' text-slate-100 text-[17px] font-semibold tracking-tight '>Welcome to ModexAi</h2>
                    <p className="text-[13px] text-slate-500">Please login to continue using the app</p>
                </div>


                <button className="w-full flex items-center justify-center gap-3  bg-white hover:bg-gray-200 py-2.75  rounded-xl text-sm font-medium text-black/90" onClick={googleLogin}>
                    <FcGoogle size={15} />
                    Continue With Google
                </button>

            </div>

           
        </div>}
</div>
    )
}


export default Home

