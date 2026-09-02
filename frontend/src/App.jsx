import React, { useEffect } from 'react'
import Home from '../pages/Home.jsx'
import getCurrentUser from '../features/getCurrentuser.js';

const App = () => {

  useEffect(() => {
    const fetchCurrentUser = async () => {
     await getCurrentUser();
    };

    fetchCurrentUser();
  }, []);
return(
 
<Home/>)

}

export default App
