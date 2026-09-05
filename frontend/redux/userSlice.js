import { createSlice } from '@reduxjs/toolkit'

//create a slice for user data
export const userDataSlice = createSlice({
  name: 'user',
  initialState:{  //initial state for user data is null
    userData: null
  },
  reducers: {
    SetUserdata: (state, action) => {
      state.userData = action.payload //set the user data to the payload of the action because the payload will contain the user data
    }
  
  },
})


export const { SetUserdata } = userDataSlice.actions

export default userDataSlice.reducer