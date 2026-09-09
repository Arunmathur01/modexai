import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import conversationReducer from './conversationSlice.js'
export const store = configureStore({ // it is used to store the user data and other data in the redux store
  reducer: {
    user: userReducer, // it is used to store the user data in the redux store
    conversation:conversationReducer,
  
  },
})