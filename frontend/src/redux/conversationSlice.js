import { createSlice } from '@reduxjs/toolkit'

//create a slice for user data
export const conversationSlice = createSlice({
  name: 'conversation',
  initialState:{  //initial state for user data is null
    conversation: [],
    selectedConversation:null
  },
  reducers: {
    Setconversation: (state, action) => {
      state.conversation = action.payload //set the user data to the payload of the action because the payload will contain the user data
    },
    addconversation:(state,action)=>{
        state.conversation.unshift(action.payload)
    },
    
        SetselectedConversation:(state,action)=>{
            state.selectedConversation=action.payload
        },
         setupdateConversation:(state,action)=>{
          const {title,conversationId}=action.payload
          state.conversation=state.conversation.map((conv)=>(
            conv._id==conversationId?(
              {...conv,title}
            ):conv
          ))
           if(state.selectedConversation?._id==conversationId){
            state.selectedConversation={...state.selectedConversation,title}
           } 
        }
    
  
  },
})


export const { Setconversation ,addconversation,SetselectedConversation,setupdateConversation} = conversationSlice.actions

export default conversationSlice.reducer