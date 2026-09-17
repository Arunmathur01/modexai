
import { createSlice } from '@reduxjs/toolkit'

//create a slice for user data
export const messageSlice = createSlice({
  name: 'message',
  initialState:{  //initial state for user data is null
    message: [],
    
  },
  reducers: {
    Setmessage: (state, action) => {
      state.message = action.payload //set the user data to the payload of the action because the payload will contain the user data
    },
    addmessage:(state,action)=>{
      state.message.push(action.payload)
    },
    SetcodePreview:(state,action)=>{
      state.codePreview=action.payload
    }
  },
})


export const { Setmessage ,addmessage,SetcodePreview} = messageSlice.actions

export default messageSlice.reducer