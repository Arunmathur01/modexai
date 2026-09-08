import React, { useEffect } from 'react'
import Home from './pages/Home.jsx'
import getCurrentUser from './features/getCurrentuser.js';
import {useDispatch} from 'react-redux'
import { SetUserdata } from './redux/userSlice.js'

const App = () => {
  const dispatch = useDispatch(); //useDispatch is a hook provided by react-redux that allows you to dispatch actions to the Redux store. In this case, it is used to dispatch the SetUserdata action to update the user data in the Redux store.

  useEffect(() => {
    const fetchCurrentUser = async () => {
     const data=await getCurrentUser();
     dispatch(SetUserdata(data));//it set the user data to SetUserdata action to update the user data in the Redux store. The data is obtained from the getCurrentUser function, which fetches the current user data from the backend API.
     //when user rfresh the page it will show the current login user.
     
    };

    fetchCurrentUser();
  }, []);
return(
 
<Home/>)

}

export default App
